from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
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

class Shelf:
    books: list

class Book:
    name: str
    author: str
    rating: int

catalogue = [
    { 'name': 'The Great Gatsby', 'author': 'F. Scott Fitzgerald' , 'rating': 3},
    { 'name': 'The Catcher in the Rye', 'author': 'J.D. Salinger' , 'rating': 2},
    { 'name': 'To Kill a Mockingbird', 'author': 'Harper Lee' , 'rating': 5},
    { 'name': '1984', 'author': 'George Orwell' , 'rating': 5},
    { 'name': 'Pride and Prejudice', 'author': 'Jane Austen' , 'rating': 4},
]

# 
@app.get("/shelf")
def get_shelf():
    return catalogue


@app.get("/book/{book_id}")
def get_book():
    pass

# class Item(BaseModel):
#     name: str
#     price: float
#     is_offer: Union[bool, None] = None


# @app.get("/")
# def read_root():
#     return {"Hello": "World"}


# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}


# @app.put("/items/{item_id}")
# def update_item(item_id: int, item: Item):
#     return {"item_price": item.price, "item_id": item_id}