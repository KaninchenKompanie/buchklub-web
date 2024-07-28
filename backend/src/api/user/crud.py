from fastapi import Depends, HTTPException
import secrets
from sqlmodel import Session, select

from api.user.model import UserCreate, User
from api.database import get_session
from api.auth.auth_handler import sign_jwt
from api.auth import password


def new_user(user: UserCreate, s: Session = Depends(get_session)):
    data = {"hashed_password": hash(user.password)}
    db_user = User.model_validate(user, update=data)
    s.add(db_user)
    s.commit()
    s.refresh(db_user)
    return sign_jwt(db_user.name)


def check_user(a: str, b: str) -> bool:
    return secrets.compare_digest(a, b)


def validate_user(user: UserCreate, s: Session = Depends(get_session)):
    try:
        ret_user: User = s.exec(select(User).where(User.id == user.id)).one()
        if check_user(ret_user.name, user.name) and password.validate(user.password, ret_user.hashed_password):
            return sign_jwt(ret_user.name)
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

