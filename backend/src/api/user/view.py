from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from api.user.model import UserCreate, UserPublic, User
from api.database import get_session

router = APIRouter()


@router.post("/users/", response_model=UserPublic)
def create_user(user: UserCreate, s: Session = Depends(get_session)):
    s.add(user)
    s.commit()
    s.refresh(user)
    return user

@router.get("/users/", response_model=UserPublic)
def list_users(s: Session = Depends(get_session)):
    users = s.exec(select(User)).all()
    return users
