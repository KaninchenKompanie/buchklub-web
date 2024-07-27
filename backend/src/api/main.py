from contextlib import asynccontextmanager

from fastapi import FastAPI

from api.database import create_db_and_tables, create_mock_data
from api import api

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    create_mock_data()
    yield

def create_app() -> FastAPI:

    app = FastAPI(lifespan=lifespan)
    app.include_router(api)
    return app

app = create_app()

