from contextlib import asynccontextmanager
from enum import Enum
from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel
from sqlmodel import create_engine, select, Session, SQLModel
from sqlalchemy import Engine

from .models import User, Book

engine = None

config = {
    "db-user": "robert",
    "db-pass": "qwer1234"
}

db_name = "buchklub-db"
db_url = f"postgresql://{config['db-user']}:{config['db-pass']}@localhost/{db_name}"
engine = create_engine(db_url, echo=True)

@asynccontextmanager
async def lifespan(app: FastAPI):
    SQLModel.metadata.create_all(engine)
    yield

app = FastAPI(lifespan=lifespan)



@app.post("/users/")
def create_user(user: User):
    with Session(engine) as s:
        s.add(user)
        s.commit()
        s.refresh(user)
        return user

@app.get("/users/")
def list_users():
    with Session(engine) as s:
        users = s.exec(select(User)).all()
        return users

@app.post("/books/")
def create_user(book: Book):
    with Session(engine) as s:
        s.add(book)
        s.commit()
        s.refresh(book)
        return book

@app.get("/books/")
def list_books():
    with Session(engine) as s:
        books = s.exec(select(Book)).all()
        return books
