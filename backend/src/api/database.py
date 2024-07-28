from fastapi import Depends, HTTPException
from sqlalchemy import select
from sqlmodel import create_engine, Session, SQLModel
from api.book.model import Book
from api.rating.model import Rating
from api.user.model import User
from api.auth import password



engine = None

config = {
    "db-user": "postgres",
    "db-pass": "qwer1234",
    "db-network": "localhost",
    "db-port": 5433
}

db_name = "buchklub-db"
db_url = f"postgresql://{config['db-user']}:{config['db-pass']}@{config['db-network']}:{config['db-port']}/{db_name}"

engine = create_engine(db_url, echo=True)

import sys
import locale

print(f"Default encoding: {sys.getdefaultencoding()}")
print(f"file system encoding: {sys.getfilesystemencoding()}")
print(f"locale encoding: {locale.getpreferredencoding()}")

def create_db_and_tables():
    print(db_url)
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as s:
        yield s

def write_to_db(Field, data,s:Session=Depends(get_session)):
    if not Field.__name__ == "Rating":
        existing_data = s.exec(select(Field).where(Field.name == data.name)).first()
        if not existing_data:
            data = Field.model_validate(data)
            s.add(data)
            s.commit()
            s.refresh(data)
        else:
            raise HTTPException(status_code=409, detail=f"{data.name} existiert bereits!")
    else: 
        data = Field.model_validate(data)
        s.add(data)
        s.commit()
        s.refresh(data)
    return data


def create_mock_data():
    
    with Session(engine) as s:
        b = Book(name="Frankenstein", author="Mary Shelly", genre=["Horror"],year=1818)
        b1 = Book(name="Die unendliche Geschichte", author="Michael Ende", genre=["Fantasy"],year=2005)
        b2 = Book(name="Life of Pi", author="Yann Martel", genre=["Dokumentation"], year=2030)
        b3 = Book(name="Picture of Dorian Grey", author="Robert Deibel", genre=["porn"], year=1999)
        books = [b,b1,b2,b3]
        for book in books:
            write_to_db(Book,book,s)
        u = User(name="Robert",hashed_password=password.hash("robert"))
        u1 = User(name="Leo", hashed_password=password.hash("leo"))
        u2 = User(name="Inge", hashed_password=password.hash("inge"))
        u3 = User(name="Harald", hashed_password=password.hash("pipikaka"))
        u4 = User(name="Denise", hashed_password=password.hash("pipikaka2"))
        users = [u, u1, u2, u3, u4]
        for user in users:
            write_to_db(User,user,s)
        uid = s.exec(select(User).where(User.name == u.name)).first()[0].id
        u1id = s.exec(select(User).where(User.name == u1.name)).first()[0].id
        u2id = s.exec(select(User).where(User.name == u2.name)).first()[0].id
        u3id = s.exec(select(User).where(User.name == u3.name)).first()[0].id
        u4id = s.exec(select(User).where(User.name == u4.name)).first()[0].id
        bid = s.exec(select(Book).where(Book.name == b.name)).first()[0].id
        if bid and uid and u1id and u2id and u3id:
            rb = Rating(book_id=bid, user_id=uid, setting=1, plot=1, engagement=1, characters=1, style=1, recommend=False, comment="awesome")
            r1b = Rating(book_id=bid, user_id=u1id, setting=1, plot=7, engagement=7, characters=7, style=7, recommend=True, comment="sucked")
            r2b = Rating(book_id=bid, user_id=u2id, setting=1, plot=1, engagement=1, characters=1, style=1, recommend=False, comment="")
            r3b = Rating(book_id=bid, user_id=u3id, setting=1, plot=1, engagement=1, characters=1, style=1, recommend=False, comment="")
            ratings = [rb, r1b, r2b, r3b]
            for rating in ratings:
                write_to_db(Rating,rating,s)
        b1id = s.exec(select(Book).where(Book.name == b1.name)).first()[0].id
        if b1id and uid and u1id and u2id and u3id and u4id:
            rb1 = Rating(book_id=b1id, user_id=uid, setting=2, plot=3, engagement=4, characters=5, style=6, recommend=True, comment="")
            r1b1 = Rating(book_id=b1id, user_id=u1id, setting=2, plot=3, engagement=7, characters=4, style=7, recommend=True, comment="")
            r2b1 = Rating(book_id=b1id, user_id=u2id, setting=1, plot=1, engagement=1, characters=1, style=1, recommend=True, comment="")
            r3b1= Rating(book_id=b1id, user_id=u3id, setting=1, plot=1, engagement=1, characters=1, style=1, recommend=False, comment="okay")
            r4b1 = Rating(book_id=b1id, user_id=u4id, setting=1, plot=1, engagement=1, characters=1, style=1, recommend=False, comment="")
            name = Rating.__name__
            print("Rating name", name)
            ratings = [rb1, r1b1, r2b1, r3b1, r4b1]
            for rating in ratings:
                write_to_db(Rating,rating,s)
        b2id = s.exec(select(Book).where(Book.name == b2.name)).first()[0].id
        if b2id and uid and u1id and u2id:
            rb2 = Rating(book_id=b2id, user_id=uid, setting=6, plot=1, engagement=5, characters=7, style=1, recommend=False, comment="")
            r1b2 = Rating(book_id=b2id, user_id=u1id, setting=6, plot=3, engagement=2, characters=7, style=2, recommend=False, comment="")
            r2b2 = Rating(book_id=b2id, user_id=u2id, setting=6, plot=1, engagement=6, characters=1, style=1, recommend=False, comment="")
            ratings = [rb2, r1b2, r2b2]
            for rating in ratings:
                write_to_db(Rating,rating,s)
