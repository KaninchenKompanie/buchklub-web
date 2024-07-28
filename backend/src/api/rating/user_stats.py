from typing import Any, Dict
from api.rating.model import Rating
from api.user.model import User
from sqlalchemy import func, select
from sqlmodel import Session

from typing import Any, Dict
from sqlmodel import Session, select
from sqlalchemy import func
from api.rating.model import Rating
from fastapi import Depends, APIRouter, HTTPException

def get_user_statistics(user_id: int, s: Session) -> Dict[str, Any]:
    user = s.exec(select(User).where(User.id == user_id)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    
    # Helper function to get most and least liked for a category for a specific user
    def get_most_and_least_liked(user_id: int, category: str):
        most_liked = s.exec(
            select(Rating.book_id, func.avg(getattr(Rating, category)).label(f'avg_{category}'))
            .where(Rating.user_id == user_id)
            .group_by(Rating.book_id)
            .order_by(func.avg(getattr(Rating, category)).desc())
            .limit(1)
        ).first()
        
        least_liked = s.exec(
            select(Rating.book_id, func.avg(getattr(Rating, category)).label(f'avg_{category}'))
            .where(Rating.user_id == user_id)
            .group_by(Rating.book_id)
            .order_by(func.avg(getattr(Rating, category)).asc())
            .limit(1)
        ).first()
        
        return most_liked, least_liked

    user_stats = {"user_id": user_id}
        
    # Categories to analyze
    categories = ['plot', 'characters', 'setting', 'engagement', 'style']

    # Most and least liked for each category
    most_and_least_liked = {}
    for category in categories:
        most_liked, least_liked = get_most_and_least_liked(user_id, category)
        most_and_least_liked[f'most_liked_{category}'] = {
            "book_id": most_liked.book_id if most_liked else None,
            "rating": getattr(most_liked, f'avg_{category}') if most_liked else None,
        }
        most_and_least_liked[f'least_liked_{category}'] = {
            "book_id": least_liked.book_id if least_liked else None,
            "rating": getattr(least_liked, f'avg_{category}') if least_liked else None,
        }

    # Average rating for each category
    avg_ratings = s.exec(
        select(
            func.avg(Rating.setting).label('avg_setting'),
            func.avg(Rating.plot).label('avg_plot'),
            func.avg(Rating.engagement).label('avg_engagement'),
            func.avg(Rating.characters).label('avg_characters'),
            func.avg(Rating.style).label('avg_style')
        ).where(Rating.user_id == user_id)
    ).one()

    # Number of books recommended by the user
    num_books_recommended = s.exec(
        select(func.count(Rating.id))
        .where(Rating.recommend == True, Rating.user_id == user_id)
    ).one()

    # Number of books read by the user
    num_books_read = s.exec(
        select(func.count(Rating.book_id.distinct()))
        .where(Rating.user_id == user_id)
    ).one()

    user_stats.update({
        **most_and_least_liked,
        "rating": {
            "setting": avg_ratings.avg_setting,
            "plot": avg_ratings.avg_plot,
            "engagement": avg_ratings.avg_engagement,
            "characters": avg_ratings.avg_characters,
            "style": avg_ratings.avg_style,
        },
        "num_books_recommended": num_books_recommended,
        "num_books_read": num_books_read,
    })

    return user_stats