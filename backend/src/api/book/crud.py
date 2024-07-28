from api.book.model import Book
from sqlmodel import Session, select
from fastapi import Depends

from api.database import get_session, write_to_db


def create_book(book: Book, s: Session = Depends(get_session)):
    return write_to_db(Book, book,s)

def read_books(s: Session = Depends(get_session)):
    books = s.exec(select(Book)).all()
    return books

def read_book(id: int, s: Session = Depends(get_session)):
    book = s.exec(select(Book).where(Book.id == id)).one()
    return book


def update_book(book: Book, s: Session = Depends(get_session)):
    old_book = read_book(book.id, s)
    old_book = book
    s.add(old_book)
    s.commit()
    s.refresh(old_book)
    return old_book

def delete_book(id: int, s: Session = Depends(get_session)):
    book = read_book(id, s)
    s.delete(book)
    s.commit()
