import React, { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";

function Home() {

  // =========================
  // STATES
  // =========================
  const [movies, setMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  // =========================
  // SEARCH MOVIES (OMDb)
  // =========================
  const handleSearch = async (query) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=8b2506ba&s=${query}`
      );

      setMovies(response.data.Search || []);

    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // GET RECOMMENDATIONS (FASTAPI)
  // =========================
  const fetchRecommendations = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("TOKEN:", token);

      if (!token) return;

      const response = await axios.get(
        "http://127.0.0.1:8000/recommendations/",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("RECOMMENDATIONS:", response.data);

      // IMPORTANT FIX: backend key safety
      setRecommendedMovies(
        response.data.recommended_movies || []
      );

    } catch (error) {
      console.log("ERROR:", error.response?.data || error.message);
    }
  };

  // =========================
  // LOAD RECOMMENDATIONS ON PAGE OPEN
  // =========================
  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        {/* SEARCH */}
        <SearchBar onSearch={handleSearch} />

        {/* ========================= */}
        {/* SEARCH RESULTS */}
        {/* ========================= */}
        <h1 className="section-title">
          Search Results
        </h1>

    <div className="movies-grid">
  {movies.length > 0 ? (
    movies.map((movie) => (
      <MovieCard
        key={movie.imdbID}
        movie={{
          imdbID: movie.imdbID,
          title: movie.Title,
          genre: movie.Type,
          poster: movie.Poster,
          reason: movie.Year
        }}
      />
    ))
  ) : (
    <p>No search results</p>
  )}
</div>

        {/* ========================= */}
        {/* RECOMMENDATIONS */}
        {/* ========================= */}
        <h1 className="section-title">
          Recommended Movies
        </h1>

        <div className="movies-grid">

          {recommendedMovies.length > 0 ? (
            recommendedMovies.map((movie, index) => (
              <MovieCard
                key={index}
                movie={{
                  title: movie.title,
                  genre: movie.genre,
                  poster: movie.poster || "https://via.placeholder.com/300x450?text=No+Image",
                  reason: movie.reason
                }}
              />
            ))
          ) : (
            <p>No recommendations yet</p>
          )}

        </div>

      </div>
    </div>
    
  );
}

export default Home;