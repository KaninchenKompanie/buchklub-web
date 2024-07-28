import secrets
from passlib.hash import argon2


def validate(password: str, hash: str) -> bool:
    return argon2.verify(password, hash)


def hash(password: str) -> str:
    return argon2.hash(password)
