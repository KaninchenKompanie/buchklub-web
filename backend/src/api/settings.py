from decouple import config

JWT_SECRET = config("jwt_secret")
JWT_ALGORITHM = config("jwt_algorithm")

ORIGINS = config("allowed_origins")
