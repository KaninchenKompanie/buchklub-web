import time
from typing import Dict

from pydantic import BaseModel
import jwt
from api import settings

class JWTPayload(BaseModel):
    user_id: str
    expires: float

class JWT(BaseModel):
    access_token: str

def token_response(token: str):
    return JWT(access_token=token)

def sign_jwt(user_name: str) -> JWT:
    payload = {
        "user_name": user_name,
        "expires": time.time() + 600
    }

    token = jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)
    return token_response(token)

def decode_jwt(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        return decoded_token if decoded_token["expires"] >= time.time() else None
    except:
        return {}
