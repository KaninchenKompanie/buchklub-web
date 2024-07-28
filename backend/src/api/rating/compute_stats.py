from api.book.model import Book
from api.rating.model import Rating
from sqlalchemy import func, Integer
from sqlmodel import Session, select
from typing import Dict, Any
import numpy as np
import pandas as pd

def compute_average_categories(book_id, s: Session):
    overall_means = s.exec(
        select(
            func.avg(Rating.setting).label('setting'),
            func.avg(Rating.plot).label('plot'),
            func.avg(Rating.engagement).label('engagement'),
            func.avg(Rating.characters).label('characters'),
            func.avg(Rating.style).label('style'),
            func.avg(Rating.recommend.cast(Integer)).label('recommend')  # Include overall average for recommendation
        )
    ).one()

    book_rating_counts = s.exec(
        select(Rating.book_id, func.count(Rating.id).label('rating_count'))
        .group_by(Rating.book_id)
    ).all()

    if not book_rating_counts:
        return None

    average_ratings_per_book = float(sum(count for _, count in book_rating_counts) / len(book_rating_counts))

    book_ratings = s.exec(select(Rating).where(Rating.book_id == book_id)).all()
    if not book_ratings:
        return None

    bayesian_avgs = {}
    total_ratings = len(book_ratings)
    for category in ['setting', 'plot', 'engagement', 'characters', 'style']:
        sum_ratings = sum(getattr(r, category) for r in book_ratings)
        bayesian_avg = (float(sum_ratings) + (average_ratings_per_book * float(getattr(overall_means, category)))) / (total_ratings + average_ratings_per_book)
        bayesian_avgs[category] = bayesian_avg

    # Calculate the Bayesian average for recommendation
    sum_recommend = sum(r.recommend for r in book_ratings)
    bayesian_recommend_avg = (float(sum_recommend) + (average_ratings_per_book * float(overall_means.recommend))) / (total_ratings + average_ratings_per_book)
    bayesian_avgs['recommend'] = bayesian_recommend_avg * 100  # Convert to percentage
    bayesian_avgs['total_average_rating'] = np.mean([bayesian_avgs[category] for category in ['setting', 'plot', 'engagement', 'characters', 'style']])
    return bayesian_avgs

def get_recommendation_percentage(book_id, s: Session):
    recommend_percentage = s.exec(
        select(func.avg(Rating.recommend.cast(Integer)))
        .where(Rating.book_id == book_id)
    ).one() * 100
    return recommend_percentage

def get_all_books_statistics(s: Session):
    books = s.exec(
        select(Book).join(Rating, Book.id == Rating.book_id).group_by(Book.id)
    ).all()
    all_books_stats = []

    for book in books:
        book_stats = compute_average_categories(book.id, s)
        if book_stats:
            book_stats.update({
                'book_id': book.id,
                'book_name': book.name,
                'rating_count': len(s.exec(select(Rating).where(Rating.book_id == book.id)).all())
            })
            all_books_stats.append(book_stats)
    
    return all_books_stats

def find_best_books(s: Session):
    books = s.exec(
        select(Book).join(Rating, Book.id == Rating.book_id).group_by(Book.id)
    ).all()
    best_books = {}
    book_bayesian_avgs = {}
    book_standard_deviations = {}

    overall_means = s.exec(
        select(
            func.avg(Rating.setting).label('setting'),
            func.avg(Rating.plot).label('plot'),
            func.avg(Rating.engagement).label('engagement'),
            func.avg(Rating.characters).label('characters'),
            func.avg(Rating.style).label('style')
        )
    ).one()

    book_rating_counts = s.exec(
        select(Rating.book_id, func.count(Rating.id).label('rating_count'))
        .group_by(Rating.book_id)
    ).all()

    if not book_rating_counts:
        return {}, {}, {}

    average_ratings_per_book = float(sum(count for _, count in book_rating_counts) / len(book_rating_counts))

    for book in books:
        bayesian_avgs = compute_average_categories(book.id, s=s)
        if bayesian_avgs:
            bayesian_avgs['recommend_percentage'] = get_recommendation_percentage(book.id, s)
            book_bayesian_avgs[book.name] = bayesian_avgs
            for category, bayesian_avg in bayesian_avgs.items():
                if category not in best_books or bayesian_avg > best_books[category][f'Bayesian_{category}']:
                    best_books[category] = {
                        'Book': book.name,
                        f'Bayesian_{category}': bayesian_avg,
                        'User Count': len(s.exec(select(Rating).where(Rating.book_id == book.id)).all())
                    }
            
            ratings = s.exec(select(Rating).where(Rating.book_id == book.id)).all()
            std_dev = np.std([getattr(r, category) for category in ['setting', 'plot', 'engagement', 'characters', 'style'] for r in ratings])
            book_standard_deviations[book.name] = std_dev

    return best_books, book_bayesian_avgs, book_standard_deviations

def find_best_and_worst_book(book_bayesian_avgs):
    df = pd.DataFrame(book_bayesian_avgs).T

    if df.empty:
        return None, {}, None, {}

    percentiles = df.rank(pct=True)
    percentiles['median_percentile'] = percentiles.median(axis=1)

    best_book = percentiles['median_percentile'].idxmax()
    worst_book = percentiles['median_percentile'].idxmin()

    return best_book, book_bayesian_avgs[best_book], worst_book, book_bayesian_avgs[worst_book]

def find_most_controversial_book(book_standard_deviations, s: Session):
    if not book_standard_deviations:
        return None, {}

    most_controversial_book_title = max(book_standard_deviations, key=book_standard_deviations.get)
    most_controversial_book_id = s.exec(select(Book.id).where(Book.name == most_controversial_book_title)).one()

    ratings = s.exec(select(Rating).where(Rating.book_id == most_controversial_book_id)).all()

    sd_values = {
        "setting": np.std([r.setting for r in ratings]),
        "plot": np.std([r.plot for r in ratings]),
        "engagement": np.std([r.engagement for r in ratings]),
        "characters": np.std([r.characters for r in ratings]),
        "style": np.std([r.style for r in ratings]),
    }

    return most_controversial_book_title, sd_values

def get_book_statistics(s: Session) -> Dict[str, Any]:
    best_books, book_bayesian_avgs, book_standard_deviations = find_best_books(s=s)
    single_best_book, best_book_avgs, single_worst_book, worst_book_avgs = find_best_and_worst_book(book_bayesian_avgs)
    most_controversial_book, sd_values = find_most_controversial_book(book_standard_deviations, s)
    all_books_stats = get_all_books_statistics(s)

    if single_best_book:
        single_best_book_id = s.exec(select(Book.id).where(Book.name == single_best_book)).one()
        best_book_avgs['recommend_percentage'] = get_recommendation_percentage(single_best_book_id,s)

    if single_worst_book:
        single_worst_book_id = s.exec(select(Book.id).where(Book.name == single_worst_book)).one()
        worst_book_avgs['recommend_percentage'] = get_recommendation_percentage(single_worst_book_id, s)
    if most_controversial_book:
        most_controversial_book_id = s.exec(select(Book.id).where(Book.name == most_controversial_book)).one()
        most_controversial_book_recommend_percentage = get_recommendation_percentage(most_controversial_book_id, s)
        most_controversial_book_stats = {
            "book": most_controversial_book,
            "standard_deviation": sd_values,
            "recommend_percentage": most_controversial_book_recommend_percentage
        }
    else:
        most_controversial_book_stats = {}

    return {
        "best_books_per_category": best_books,
        "most_liked_book": {
            "book": single_best_book,
            "bayesian_averages": best_book_avgs
        } if single_best_book else {},
        "less_liked_book": {
            "book": single_worst_book,
            "bayesian_averages": worst_book_avgs
        } if single_worst_book else {},
        "most_controversial_book": most_controversial_book_stats,
        "all_books_stats": all_books_stats
    }

# Usage example (assuming you have a valid session object `s`)
# book_statistics = get_book_statistics(s)
# print(book_statistics)
