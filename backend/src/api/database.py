from sqlmodel import create_engine, Session, SQLModel
from api.book.model import Book
from api.rating.model import Rating
from api.user.model import User

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
        b = Book(name="Frankenstein", author="Mary Shelly", genre="Horror",year=1818)
        b1 = Book(name="Die unendliche Geschichte", author="Michael Ende", genre="Fantasy",year=2005)
        b2 = Book(name="Life of Pi", author="Yann Martel", genre="Dokumentation", year=2030)
        books = [b,b1,b2]
        for book in books:
            s.add(book)
            s.commit()
            s.refresh(book)
        u = User(name="Robert",hashed_password="robert")
        u1 = User(name="Leo", hashed_password="leo")
        u2 = User(name="Inge", hashed_password="inge")
        users = [u, u1, u2]
        for user in users:
            s.add(user)
            s.commit()
            s.refresh(user)
        rb = Rating(book_id=b.id, user_id=u.id, setting=1, plot=1, engagement=1, characters=1, style=1, recommend=False, comment="")
        r1b = Rating(book_id=b.id, user_id=u1.id, setting=1, plot=7, engagement=7, characters=7, style=7, recommend=True, comment="")
        r2b = Rating(book_id=b.id, user_id=u2.id, setting=1, plot=1, engagement=1, characters=1, style=1, recommend=False, comment="")

        rb1 = Rating(book_id=b1.id, user_id=u.id, setting=2, plot=3, engagement=4, characters=5, style=6, recommend=True, comment="")
        r1b1 = Rating(book_id=b1.id, user_id=u1.id, setting=2, plot=3, engagement=7, characters=4, style=7, recommend=True, comment="")
        r2b1 = Rating(book_id=b1.id, user_id=u2.id, setting=1, plot=1, engagement=1, characters=1, style=1, recommend=True, comment="")

        rb2 = Rating(book_id=b2.id, user_id=u.id, setting=6, plot=1, engagement=5, characters=7, style=1, recommend=False, comment="")
        r1b2 = Rating(book_id=b2.id, user_id=u1.id, setting=6, plot=3, engagement=2, characters=7, style=2, recommend=False, comment="")
        r2b2 = Rating(book_id=b2.id, user_id=u2.id, setting=6, plot=1, engagement=6, characters=1, style=1, recommend=False, comment="")

        ratings = [rb, r1b, r2b, rb1, r1b1, r2b1, rb2, r1b2,r2b2]
        for rating in ratings:
            s.add(rating)
            s.commit()
            s.refresh(rating)




