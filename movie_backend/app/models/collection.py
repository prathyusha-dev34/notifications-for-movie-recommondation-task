from sqlalchemy import Column, String, ForeignKey, JSON
from app.database import Base

class Collection(Base):
    __tablename__ = "collections"

    collection_id = Column(String, primary_key=True, index=True)
    user_id = Column(String, index=True)

    name = Column(String)
    description = Column(String)

    movies = Column(JSON, default=[])