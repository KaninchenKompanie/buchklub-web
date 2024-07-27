from sqlmodel import create_engine, Session, SQLModel
from api.book.model import Book

engine = None

config = {
    "db-user": "postgres",
    "db-pass": "qwer1234",
    "db-network": "localhost"
}

db_name = "buchklub-db"
db_url = f"postgresql://{config['db-user']}:{config['db-pass']}@{config['db-network']}/{db_name}"
engine = create_engine(db_url, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as s:
        yield s

def create_mock_data():
    with Session(engine) as s:
        b = Book(name="Frankenstein", author="Mary Shelly", genre="Horror")
        s.add(b)
        s.commit()

