from fastapi import APIRouter, Depends
from sqlmodel import Session

from api.rating.crud import create_rating, delete_rating, read_rating, read_ratings
from api.database import get_session
from api.rating.model import RatingBase

from api.rating import book_stats, genre_stats, user_stats

router = APIRouter()

@router.get("/")
def ratings_list(s: Session = Depends(get_session)):
    return read_ratings(s)

@router.get("/{rating_id}")
def rating(rating_id: int, s: Session = Depends(get_session)):
    return read_rating(rating_id, s)

@router.post("/")
def write_rating(rating: RatingBase, s: Session = Depends(get_session)):
    return create_rating(rating, s)

@router.delete("/{rating_id}")
def delete_rating(rating_id: int, s: Session = Depends(get_session)):
    return delete_rating(rating_id, s)

@router.get("/stats/")
def teststats(s: Session = Depends(get_session)):
    return book_stats.get_book_statistics(s)

@router.get("/stats/users/{user_id}")
def userstats(user_id: int, s: Session = Depends(get_session)):
    return user_stats.get_user_statistics(user_id, s)

@router.get("/stats/genres/")
def genrestats(s: Session = Depends(get_session)):
    return genre_stats.get_genre_statistics(s)
# @router.put("/ratings/")