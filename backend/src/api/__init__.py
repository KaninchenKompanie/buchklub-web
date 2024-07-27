from fastapi import APIRouter

from api.book import view as books
from api.user import view as users

api = APIRouter()

api.include_router(books.router)
api.include_router(users.router)
