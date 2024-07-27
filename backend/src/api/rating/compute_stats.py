from api.rating.model import Rating
from api.user.model import User
from api.book.model import Book
from api.database import get_session
from fastapi import Depends
from sqlmodel import Session

def compute_plot_average(s:Session=Depends(get_session)):
    
