from uuid import uuid4

collections_db = {}

def create_collection(user_id, data):
    collection_id = str(uuid4())

    new_collection = {
        "collection_id": collection_id,
        "user_id": user_id,
        "name": data.name,
        "description": data.description,
        "movies": []
    }

    collections_db[collection_id] = new_collection
    return new_collection


def get_collections(user_id):
    return [
        c for c in collections_db.values()
        if c["user_id"] == user_id
    ]


def delete_collection(collection_id):
    return collections_db.pop(collection_id, None)


def add_movie(collection_id, movie):
    if collection_id in collections_db:
        collections_db[collection_id]["movies"].append(movie)
        return collections_db[collection_id]
    return None