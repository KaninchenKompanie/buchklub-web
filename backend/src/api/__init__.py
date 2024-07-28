from fastapi import APIRouter, Depends

from api.auth.auth_bearer import JWTBearer
from api.book import view as books
from api.user import view as users
from api.rating import view as reviews

api = APIRouter()


api.include_router(books.router, prefix="/books", dependencies=[Depends(JWTBearer())])
api.include_router(users.router, prefix="/users")
api.include_router(reviews.router, prefix="/reviews", dependencies=[Depends(JWTBearer())])
