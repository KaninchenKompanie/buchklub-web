from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from api.user.model import UserCreate, UserPublic, User
from api.database import get_session
from api.user.crud import new_user, validate_user
from api.auth.auth_handler import JWT

router = APIRouter()


@router.post("/", response_model=JWT)
def create_user(user: UserCreate, s: Session = Depends(get_session)):
    return new_user(user, s)

@router.get("/", response_model=List[UserPublic])
def list_users(s: Session = Depends(get_session)):
    users = s.exec(select(User)).all()
    return users

@router.put("/")
def user(user: UserCreate, s: Session = Depends(get_session)):
    return validate_user(user, s)
