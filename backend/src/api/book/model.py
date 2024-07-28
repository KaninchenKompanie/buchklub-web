from typing import Set
from sqlmodel import SQLModel, Field, Relationship, Column, String
from sqlalchemy.dialects import postgresql

class BookBase(SQLModel):
    name: str
    author: str
    year: int
    genre: Set[str] = Field(default=None, sa_column=Column(postgresql.ARRAY(String())))
    # ratings: List["Rating"] = Relationship(back_populates="book")
    # comments ff

class BookCreate(BookBase):
    pass

class Book(BookBase, table=True):
    id: int | None = Field(default=None, primary_key=True)

class BookPublic(BookBase):
    id: int
