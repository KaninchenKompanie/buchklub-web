from sqlmodel import Session, select
from fastapi import Depends

from api.rating.model import Rating
from api.database import get_session


def create_rating(rating: Rating, s: Session = Depends(get_session)):
    s.add(rating)
    s.commit()
    s.refresh(rating)
    return rating

def read_ratings(s: Session = Depends(get_session)):
    ratings = s.exec(select(Rating)).all()
    return ratings

def read_rating(id: int, s: Session = Depends(get_session)):
    rating = s.exec(select(Rating).where(Rating.id == id)).one()
    return rating


def update_rating(rating: Rating, s: Session = Depends(get_session)):
    old_rating = read_rating(rating.id, s)
    old_rating = rating
    s.add(old_rating)
    s.commit()
    s.refresh(old_rating)
    return old_rating

def delete_rating(id: int, s: Session = Depends(get_session)):
    rating = read_rating(id, s)
    s.delete(rating)
    s.commit()
