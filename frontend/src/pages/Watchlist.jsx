import React, { useEffect, useState } from "react";
import axios from "axios";
import "./watchlist.css";

const API_BASE = "http://127.0.0.1:8000";

function Watchlist() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${API_BASE}/watchlist/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMovies(response.data.watchlist || []);
    } catch (error) {
      console.log(error);
    }
  };

  const removeMovie = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${API_BASE}/watchlist/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchWatchlist();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="watchlist-page">
      <h1>🎬 My Watchlist</h1>

      <div className="watchlist-grid">
        {movies.map((movie) => (
          <div className="watchlist-card" key={movie.id}>
            <img src={movie.poster} alt={movie.movie_title} />

            <div className="watchlist-info">
              <h3>{movie.movie_title}</h3>
              <p>{movie.genre}</p>

              <button onClick={() => removeMovie(movie.id)}>
                ❌ Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;