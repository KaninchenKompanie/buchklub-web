from typing import List

from fastapi import APIRouter, Depends

from sqlmodel import Session, select

from api.book.model import Book, BookPublic
from api.database import get_session

router = APIRouter()

@router.post("/", response_model=BookPublic)
def create_book(book: Book, s: Session = Depends(get_session)):
    s.add(book)
    s.commit()
    s.refresh(book)
    return book

@router.get("/", response_model=List[BookPublic])
def list_books(s: Session = Depends(get_session)):
    books = s.exec(select(Book)).all()
    return books