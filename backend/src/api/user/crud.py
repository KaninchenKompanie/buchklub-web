from fastapi import Depends, HTTPException
from sqlmodel import Session, select

from api.user.model import UserCreate, User, UserPublic
from api.database import get_session
from api.auth.auth_handler import sign_jwt
from api.auth.password import hash


def new_user(user: UserCreate, s: Session = Depends(get_session)):
    data = {"hashed_password": hash(user.password)}
    db_user = User.model_validate(user, update=data)
    s.add(db_user)
    s.commit()
    s.refresh(db_user)
    return sign_jwt(db_user.id)

def validate_user(user: UserCreate, s: Session = Depends(get_session)):
    try:
        ret_user: User = s.exec(select(User).where(User.name == user.name)).one()
        if ret_user.hashed_password == user.password:
            return sign_jwt(ret_user.id)
        else:
            raise HTTPException(status_code=401, detail="Invalid login")
    except:
        raise HTTPException(status_code=401, detail="Invalid login")

def read_users(s: Session = Depends(get_session)):
    users = s.exec(select(User)).all()
    return users

def read_user(user_id: int, s: Session = Depends(get_session)):
    try:
        user = s.exec(select(User).where(User.id == user_id)).one()
        return user
    except:
        raise HTTPException(status_code=404, detail="User not found")

