import { useEffect, useState } from "react";
import {
  getCollections,
  createCollection,
  deleteCollection,
  addMovieToCollection,
  removeMovieFromCollection,
} from "../services/collectionService";

export default function CollectionsPage() {
  const user_id = "1";

  const [collections, setCollections] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // =========================
  // FETCH COLLECTIONS
  // =========================
  const fetchCollections = async () => {
    try {
      const res = await getCollections(user_id);

      const data =
        res?.data?.collections ||
        res?.data?.data ||
        res?.data ||
        [];

      setCollections(Array.isArray(data) ? data : []);
    } catch (error) {
      setCollections([]);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  // =========================
  // CREATE
  // =========================
  const handleCreate = async () => {
    if (!name.trim()) return;

    await createCollection({
      user_id,
      name,
      description,
    });

    setName("");
    setDescription("");
    fetchCollections();
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {
    await deleteCollection(id);
    fetchCollections();
  };

  // =========================
  // ADD MOVIE
  // =========================
  const handleAddMovie = async (id) => {
    const movieId = prompt("Enter Movie ID:");
    if (!movieId) return;

    await addMovieToCollection(id, {
      movie_id: movieId,
    });

    fetchCollections();
  };

  // =========================
  // REMOVE MOVIE
  // =========================
  const handleRemoveMovie = async (cid, mid) => {
    await removeMovieFromCollection(cid, mid);
    fetchCollections();
  };

  return (
    <div style={styles.page}>
      <h2>🎬 Collections</h2>

      {/* CREATE BOX */}
      <div style={styles.box}>
        <input
          style={styles.input}
          placeholder="Collection Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button style={styles.createBtn} onClick={handleCreate}>
          Create Collection
        </button>
      </div>

      {/* GRID */}
      <div style={styles.grid}>
        {collections.map((col) => (
          <div key={col.id} style={styles.card}>
            <h3>{col.name}</h3>
            <p>{col.description}</p>

            {/* ACTION BUTTONS */}
            <div style={styles.row}>
              <button
                style={styles.addBtn}
                onClick={() => handleAddMovie(col.id)}
              >
                + Add Movie
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() => handleDelete(col.id)}
              >
                Delete
              </button>
            </div>

            {/* MOVIES */}
            {Array.isArray(col.movies) && col.movies.length > 0 && (
              <ul>
                {col.movies.map((movie) => (
                  <li key={movie.id} style={styles.movieItem}>
                    🎥 {movie.title || movie.movie_id}

                    <button
                      style={styles.removeBtn}
                      onClick={() =>
                        handleRemoveMovie(col.id, movie.id)
                      }
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// =========================
// STYLES (FINAL COLORS VERSION)
// =========================
const styles = {
  page: {
    padding: "20px",
    minHeight: "100vh",
    fontFamily: "Arial",
    background: "linear-gradient(135deg, #000000, #111827)",
    color: "white",
  },

  box: {
    marginBottom: "20px",
    padding: "15px",
    background: "#1e293b",
    borderRadius: "10px",
  },

  input: {
    display: "block",
    width: "100%",
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    outline: "none",
  },

  createBtn: {
    padding: "10px 15px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "6px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px",
  },

  card: {
    background: "#1e293b",
    padding: "15px",
    borderRadius: "10px",
  },

  row: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  // 🌟 COLORS UPDATED HERE
  addBtn: {
    background: "#16a34a",
    color: "white",
    padding: "6px 10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#dc2626",
    color: "white",
    padding: "6px 10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  removeBtn: {
    marginLeft: "10px",
    background: "#7c3aed",
    color: "white",
    padding: "4px 8px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  movieItem: {
    marginTop: "8px",
  },
};