import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "../componets/Nav";
import Footer from "../componets/Footer";

function MovieId() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) {
        setError("Movie ID is missing.");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=2569b6b9&i=${id}&plot=full`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const movieData = await response.json();

        if (movieData.Response === "True") {
          setMovie(movieData);
        } else {
          setError(movieData.Error || "Movie not found.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <p>Loading movie details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!movie) {
    return <p>Movie not found.</p>;
  }

  return (
    <>
      <main id="movie__main">
        <Nav />

        <div className="container">
          <div className="row">
            <div className="movie__header movie__details-container">
              {" "}
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="movie__poster"
              />
              <div className="movie__info">
                <h2>{movie.Title}</h2>
                <p>
                  <b>Year:</b> {movie.Year}
                </p>
                <p>
                  <b>Rated:</b> {movie.Rated}
                </p>
                <p>
                  <b>Runtime:</b> {movie.Runtime}
                </p>
                <p>
                  <b>Genre:</b> {movie.Genre}
                </p>
                <p>
                  <b>Director:</b> {movie.Director}
                </p>
                <p>
                  <b>Actors:</b> {movie.Actors}
                </p>
                <p>
                  <b>Plot:</b> {movie.Plot}
                </p>
                <p>
                  <b>IMDB Rating:</b> {movie.imdbRating}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default MovieId;
