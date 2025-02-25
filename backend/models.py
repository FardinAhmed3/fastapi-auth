from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base
from database import Base, engine

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    username = Column(String(255), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)

User.metadata.create_all(bind=engine)