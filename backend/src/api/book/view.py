from typing import List

from fastapi import APIRouter, Depends

from sqlmodel import Session, select

from api.book.model import Book, BookPublic, BookCreate
from api.database import get_session

router = APIRouter()

@router.post("/", response_model=BookPublic)
def create_book(book: BookCreate, s: Session = Depends(get_session)):
    db_book = Book.model_validate(book)
    s.add(db_book)
    s.commit()
    s.refresh(db_book)
    return db_book

@router.get("/", response_model=List[BookPublic])
def list_books(s: Session = Depends(get_session)):
    books = s.exec(select(Book)).all()
    return books