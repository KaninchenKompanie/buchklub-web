from typing import List

from api.book.crud import create_book
from fastapi import APIRouter, Depends

from sqlmodel import Session, select

from api.book.model import Book, BookPublic, BookCreate
from api.database import get_session

router = APIRouter()

@router.post("/", response_model=BookPublic)
def new_book(book: Book, s: Session = Depends(get_session)):
    return create_book(book, s)

@router.get("/", response_model=List[BookPublic])
def list_books(s: Session = Depends(get_session)):
    books = s.exec(select(Book)).all()
    return books