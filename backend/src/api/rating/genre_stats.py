from api.book.model import Book
from api.rating.model import Rating
from sqlalchemy import func, Integer
from sqlmodel import Session, select
from typing import Dict, Any
import numpy as np
import pandas as pd

def compute_genre_statistics(genre, s: Session):
    overall_means = s.exec(
        select(
            func.avg(Rating.setting).label('setting'),
            func.avg(Rating.plot).label('plot'),
            func.avg(Rating.engagement).label('engagement'),
            func.avg(Rating.characters).label('characters'),
            func.avg(Rating.style).label('style')
        )
    ).one()
    books_in_genre = s.exec(
        select(Book.id).where(Book.genre.contains([genre]))).all()
    print("overall means: ", overall_means)
    print(f"number of books in {genre}: ", len(books_in_genre))
    genre_ratings = s.exec(
        select(Rating)
        .where(Rating.book_id.in_(books_in_genre))
    ).all()
    print("genre ratings: ", genre_ratings)
    if len(books_in_genre)==0:
        return None
    bayesian_avgs = {}
    total_ratings = len(genre_ratings)
    average_ratings_per_book = total_ratings / len(books_in_genre)

    for category in ['setting', 'plot', 'engagement', 'characters', 'style']:
        sum_ratings = sum(getattr(r, category) for r in genre_ratings)
        bayesian_avg = (sum_ratings + (average_ratings_per_book * float(getattr(overall_means, category)))) / (total_ratings + average_ratings_per_book)
        bayesian_avgs[category] = bayesian_avg
    
    bayesian_avgs['total_average_rating'] = np.mean([bayesian_avgs[category] for category in ['setting', 'plot', 'engagement', 'characters', 'style']])
    
    return bayesian_avgs

def get_genre_statistics(s: Session) -> Dict[str, Any]:
    genres = s.exec(
        select(Book.genre)
        .join(Rating, Book.id == Rating.book_id)
        .distinct()
    ).all()
    print("found genres: ", genres)

    genre_stats = {}
    
    for genre in genres:
        genre_stat = compute_genre_statistics(genre[0], s)
        print("computed genre stats: ", genre_stat)
        if genre_stat:
            book_count = len(s.exec(select(Book.id).where(Book.genre.contains([genre]))).all())
            genre_stats[genre[0]] = {
                'book_count': book_count,
                'average_ratings': genre_stat
            }

    # Filter out genres with no ratings
    genre_stats = {genre: stats for genre, stats in genre_stats.items() if stats['book_count'] > 0 and all(value is not None for value in stats['average_ratings'].values())}
    print("final genre stats: ", genre_stats)
    return genre_stats
