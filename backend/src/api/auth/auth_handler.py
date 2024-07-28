import time
from typing import Tuple
from fastapi import Request, HTTPException


from pydantic import BaseModel
import jwt
from api import settings
from api.user.model import User, UserPublic

class JWTPayload(BaseModel):
    user_id: str
    expires: float

class JWT(BaseModel):
    access_token: str


class JWTPair(BaseModel):
    access_token: JWT
    refresh_token: JWT

def _token_response(token: str, refresh_token: str):
    print("building tokens")
    print(JWT(access_token=token))
    print(JWT(access_token=refresh_token))
    print(JWTPair(access_token=JWT(access_token=token), refresh_token=JWT(access_token=refresh_token)))
    return JWTPair(access_token=JWT(access_token=token), refresh_token=JWT(access_token=refresh_token))

def _sign_jwt(user: User, time: float) -> JWT:
    payload = {
        "id": user.id,
        "name": user.name,
        "expires": time
    }

    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)


def sign_jwt(user: User) -> JWTPair:
    ttl = 600
    t = time.time()
    refresh_ttl = ttl * 200
    return _token_response(_sign_jwt(user, t + ttl), _sign_jwt(user, t + refresh_ttl))


def decode_jwt(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        return decoded_token if decoded_token["expires"] >= time.time() else None
    except:
        return {}

def refresh_token(refresh_token: JWT) -> JWTPair:
    token = decode_jwt(refresh_token.access_token)
    if token is not None and token is not {}:
        ttl = 600
        t = time.time()
        user = UserPublic(name=token["name"], id=token["id"])
        return JWTPair(access_token=JWT(access_token=_sign_jwt(user, t + ttl)), refresh_token=refresh_token)
    else:
        raise HTTPException(status_code=403, detail="Invalid or expired token.")
