from sqlmodel import SQLModel, Field, Relationship

from api.book.model import Book


class RatingBase(SQLModel):
    book_id: int = Field(foreign_key="book.id")
    # book: Book = Relationship(back_populates="ratings")
    user_id: int = Field(foreign_key="user.id")
    # TODO: validations
    setting: int
    plot: int
    engagement: int
    characters: int
    style: int
    recommend: bool
    comment: str = ""

class Rating(RatingBase, table=True):
    id: int | None = Field(default=None, primary_key=True)

class RatingPublic(RatingBase):
    id: int

