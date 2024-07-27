from sqlmodel import create_engine, Session, SQLModel

engine = None

config = {
    "db-user": "dbuser",
    "db-pass": "qwer1234"
}

db_name = "buchklub-db"
db_url = f"postgresql://{config['db-user']}:{config['db-pass']}@db/{db_name}"
engine = create_engine(db_url, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as s:
        yield s
