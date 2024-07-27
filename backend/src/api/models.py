from sqlmodel import SQLModel, Field


class RatingBase (SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)

    # book ff

