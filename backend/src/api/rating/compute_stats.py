from api.book.model import Book
from api.rating.model import Rating
from fastapi import Depends
import numpy as np
import pandas as pd
from typing import Optional, Dict, Any

from sqlalchemy import func
from sqlmodel import Session

from sqlmodel import Field, SQLModel, create_engine, Session, select
from typing import List

def compute_average_categories(book_id, s: Session):
    # Calculate overall averages
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

    average_ratings_per_book = float(sum(count for _, count in book_rating_counts) / len(book_rating_counts))


    # Compute Bayesian average for the specified book
    book_ratings = s.exec(select(Rating).where(Rating.book_id == book_id)).all()
    if not book_ratings:
        return None  # No ratings for this book

    bayesian_avgs = {}
    total_ratings = len(book_ratings)
    for category in ['setting', 'plot', 'engagement', 'characters', 'style']:
        sum_ratings = sum(getattr(r, category) for r in book_ratings)
        bayesian_avg = (float(sum_ratings) + (average_ratings_per_book * float(getattr(overall_means, category)))) / (total_ratings + average_ratings_per_book)
        bayesian_avgs[category] = bayesian_avg

    return bayesian_avgs

def find_best_books(s: Session):
    books = s.exec(select(Book)).all()
    best_books = {}
    book_bayesian_avgs = {}
    book_standard_deviations = {}

    # Calculate overall averages
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

    average_ratings_per_book = sum(count for _, count in book_rating_counts) / len(book_rating_counts)


    for book in books:
        bayesian_avgs = compute_average_categories(book.id, s=s)
        if bayesian_avgs:
            book_bayesian_avgs[book.name] = bayesian_avgs
            for category, bayesian_avg in bayesian_avgs.items():
                if category not in best_books or bayesian_avg > best_books[category][f'Bayesian_{category}']:
                    best_books[category] = {
                        'Book': book.name,
                        f'Bayesian_{category}': bayesian_avg,
                        'User Count': len(s.exec(select(Rating).where(Rating.book_id == book.id)).all())
                    }
            
            # Calculate standard deviation for each book
            std_dev = np.std([getattr(r, category) for category in ['setting', 'plot', 'engagement', 'characters', 'style'] for r in s.exec(select(Rating).where(Rating.book_id == book.id)).all()])
            book_standard_deviations[book.name] = std_dev

    return best_books, book_bayesian_avgs, book_standard_deviations

def find_single_best_book(book_bayesian_avgs):
    # Convert book_bayesian_avgs to DataFrame for easier manipulation
    df = pd.DataFrame(book_bayesian_avgs).T

    # Calculate percentiles for each book in each category
    percentiles = df.rank(pct=True)

    # Calculate the median of the percentiles for each book
    percentiles['median_percentile'] = percentiles.median(axis=1)

    # Identify the book with the highest median percentile
    best_book = percentiles['median_percentile'].idxmax()

    return best_book, percentiles.loc[best_book]

def find_most_controversial_book(book_standard_deviations):
    # Identify the book with the highest standard deviation
    most_controversial_book = max(book_standard_deviations, key=book_standard_deviations.get)
    return most_controversial_book, book_standard_deviations[most_controversial_book]

def get_book_statistics(s: Session) -> Dict[str, Any]:
    best_books, book_bayesian_avgs, book_standard_deviations = find_best_books(s=s)
    
    single_best_book, book_percentiles = find_single_best_book(book_bayesian_avgs)
    
    most_controversial_book, std_dev = find_most_controversial_book(book_standard_deviations)
    
    return {
        "best_books_per_category": best_books,
        "single_best_book": {
            "book": single_best_book,
            "percentiles": book_percentiles.to_dict()
        },
        "most_controversial_book": {
            "book": most_controversial_book,
            "standard_deviation": std_dev
        }
    }

