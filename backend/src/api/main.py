from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.database import create_db_and_tables, create_mock_data
from api import api

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    create_mock_data()
    yield

def create_app() -> FastAPI:

    app = FastAPI(lifespan=lifespan)
    origins = [
        "http://localhost:5173"
    ]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins, 
        allow_credentials=True, 
        allow_methods=["*"], 
        allow_headers=["*"]
    )

    app.include_router(api)
    return app

app = create_app()

origins = [
    "http://localhost:5173"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"]
)