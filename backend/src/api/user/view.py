from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from api.user.model import UserCreate, UserPublic, User
from api.database import get_session
from api.user.crud import new_user, validate_user
from api.auth.auth_handler import JWT, JWTPair, refresh_token as auth_refresh_token
from api.auth.auth_bearer import JWTBearer

router = APIRouter()


@router.post("/", response_model=JWTPair)
def create_user(user: UserCreate, s: Session = Depends(get_session)):
    return new_user(user, s)

@router.get("/", response_model=List[UserPublic], dependencies=[Depends(JWTBearer())])
def list_users(s: Session = Depends(get_session)):
    users = s.exec(select(User)).all()
    return users

@router.put("/")
def user(user: UserCreate, s: Session = Depends(get_session), response_model=JWTPair):
    return validate_user(user, s)

@router.put("/refresh", response_model=JWTPair)
def refresh_token(token: JWT):
    return auth_refresh_token(token)
