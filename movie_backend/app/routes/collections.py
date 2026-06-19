from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import uuid4

from app.database import get_db
from app.models.collection import Collection
from app.schemas.collection import CollectionCreate, Movie

router = APIRouter()


# =========================
# TEST ROUTE
# =========================
@router.get("/test")
def test():
    return {"message": "Collections API Working"}


# =========================
# CREATE COLLECTION
# =========================
@router.post("/")
def create_collection(
    user_id: str,
    data: CollectionCreate,
    db: Session = Depends(get_db)
):
    new_collection = Collection(
        collection_id=str(uuid4()),
        user_id=user_id,
        name=data.name,
        description=data.description,
        movies=[]
    )

    db.add(new_collection)
    db.commit()
    db.refresh(new_collection)

    return new_collection


# =========================
# GET USER COLLECTIONS
# =========================
@router.get("/user/{user_id}")
def get_collections(
    user_id: str,
    db: Session = Depends(get_db)
):
    return db.query(Collection).filter(
        Collection.user_id == user_id
    ).all()


# =========================
# GET SINGLE COLLECTION
# =========================
@router.get("/{collection_id}")
def get_collection(
    collection_id: str,
    db: Session = Depends(get_db)
):
    collection = db.query(Collection).filter(
        Collection.collection_id == collection_id
    ).first()

    if not collection:
        raise HTTPException(
            status_code=404,
            detail="Collection not found"
        )

    return collection


# =========================
# UPDATE COLLECTION
# =========================
@router.put("/{collection_id}")
def update_collection(
    collection_id: str,
    data: CollectionCreate,
    db: Session = Depends(get_db)
):
    collection = db.query(Collection).filter(
        Collection.collection_id == collection_id
    ).first()

    if not collection:
        raise HTTPException(
            status_code=404,
            detail="Collection not found"
        )

    collection.name = data.name
    collection.description = data.description

    db.commit()
    db.refresh(collection)

    return collection


# =========================
# DELETE COLLECTION
# =========================
@router.delete("/{collection_id}")
def delete_collection(
    collection_id: str,
    db: Session = Depends(get_db)
):
    collection = db.query(Collection).filter(
        Collection.collection_id == collection_id
    ).first()

    if not collection:
        raise HTTPException(
            status_code=404,
            detail="Collection not found"
        )

    db.delete(collection)
    db.commit()

    return {
        "message": "Collection deleted successfully"
    }


# =========================
# ADD MOVIE
# =========================
# =========================
# ADD MOVIE
# =========================
@router.post("/{collection_id}/movies")
def add_movie(
    collection_id: str,
    movie: Movie,
    db: Session = Depends(get_db)
):
    print("\n===== DEBUG START =====")
    print("SEARCHING FOR:", collection_id)

    all_collections = db.query(Collection).all()

    print("TOTAL COLLECTIONS:", len(all_collections))

    for c in all_collections:
        print(
            f"ID={c.collection_id}, "
            f"NAME={c.name}, "
            f"USER={c.user_id}"
        )

    collection = db.query(Collection).filter(
        Collection.collection_id == collection_id
    ).first()

    print("FOUND:", collection)
    print("===== DEBUG END =====\n")

    if not collection:
        raise HTTPException(
            status_code=404,
            detail="Collection not found"
        )

    movies = collection.movies or []

    movies.append({
        "movie_id": movie.movie_id,
        "movie_title": movie.movie_title
    })

    collection.movies = movies

    db.commit()
    db.refresh(collection)

    return {
        "message": "Movie added successfully",
        "collection": collection
    }

# =========================
# REMOVE MOVIE
# =========================
@router.delete("/{collection_id}/movies/{movie_id}")
def remove_movie(
    collection_id: str,
    movie_id: str,
    db: Session = Depends(get_db)
):
    collection = db.query(Collection).filter(
        Collection.collection_id == collection_id
    ).first()

    if not collection:
        raise HTTPException(
            status_code=404,
            detail="Collection not found"
        )

    if not collection.movies:
        return {
            "message": "No movies in collection"
        }

    collection.movies = [
        m for m in collection.movies
        if m.get("movie_id") != movie_id
    ]

    db.commit()
    db.refresh(collection)

    return {
        "message": "Movie removed successfully"
    }