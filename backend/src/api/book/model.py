from typing import List
from sqlmodel import SQLModel, Field, Relationship

class BookBase(SQLModel):
    name: str
    author: str
    genre: str
    # ratings: List["Rating"] = Relationship(back_populates="book")
    # comments ff

class Book(BookBase, table=True):
    id: int | None = Field(default=None, primary_key=True)

class BookPublic(BookBase):
    id: int
