from pydantic import BaseModel
from typing import List, Dict, Optional

class Movie(BaseModel):
    movie_id: str
    movie_title: str

class CollectionCreate(BaseModel):
    name: str
    description: Optional[str] = None

class CollectionResponse(BaseModel):
    collection_id: str
    user_id: str
    name: str
    description: Optional[str]
    movies: List[Movie] = []