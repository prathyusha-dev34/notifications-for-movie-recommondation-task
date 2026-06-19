export default function CollectionCard({
  collection,
  onDelete,
  onAddMovie,
  onRemoveMovie,
}) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
      
      <h3>{collection.name}</h3>
      <p>{collection.description}</p>

      {/* COLLECTION BUTTON AREA */}
      <div className="collections-buttons">
        <button
          className="delete"
          onClick={() => onDelete(collection.collection_id)}
        >
          Delete
        </button>

        <button
          className="add"
          onClick={() =>
            onAddMovie(collection.collection_id, {
              movie_id: "batman_1",
              movie_title: "Batman Begins",
            })
          }
        >
          Add Movie
        </button>
      </div>

      <h4>Movies:</h4>

      {collection.movies?.map((m) => (
        <div key={m.movie_id}>
          🎬 {m.movie_title}
          <button
            onClick={() =>
              onRemoveMovie(collection.collection_id, m.movie_id)
            }
          >
            ❌ Remove
          </button>
        </div>
      ))}

    </div>
  );
}