from sqlmodel import SQLModel, Field

class BookBase(SQLModel):
    name: str
    author: str
    genre: str
    # ratings ff
    # comments ff

class Book(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
