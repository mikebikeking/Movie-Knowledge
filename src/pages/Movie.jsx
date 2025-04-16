import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Nav from "../componets/Nav";
import Footer from "../componets/Footer";

function Movie() {
  const [movies, setMovies] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const searchInputRef = useRef(null);
  const location = useLocation();

  const fetchMoviesFromAPI = async (searchTerm) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=2569b6b9&s=${searchTerm}`
      );
      const moviesData = await response.json();
      setLoading(false);
      return moviesData.Response === "True" && moviesData.Search
        ? moviesData.Search
        : [];
    } catch (error) {
      console.error(`Error fetching movies for "${searchTerm}":`, error);
      setLoading(false);
      return [];
    }
  };

  const renderMovies = (moviesToRender) => {


    if (moviesToRender.length === 0 && !loading) {
      return <p>No movies found.</p>;
    }
    if (loading) {
      return <p>Loading...</p>;
    }

    return moviesToRender.map((movie) => (
      <div key={movie.imdbID} className="movie">
        
            <div className="movie-card">
              <Link to={`/movie/${movie.imdbID}`}>
                {" "}
                <div className="movie-card__container clickable">
                  {" "}
                  <h3>{movie.Title}</h3>
                  <p>
                    <b>
                      <img
                        src={`${movie.Poster} Poster`}
                        alt={`${movie.Title} Poster`}
                        width="100"
                      />
                    </b>
                  </p>
                  <p>
                    <b>Year: {movie.Year}</b>
                  </p>
                </div>
              </Link>
            </div>
          
       
        
      </div>
    ));
  };

  const handleSearch = async (term) => {
    if (term) {
      const fetchedMovies = await fetchMoviesFromAPI(term);
      setMovies(fetchedMovies);
    }
  };

  const handleSearchIconClick = () => {
    handleSearch(searchTerm);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(searchTerm);
    }
  };

  const sortMovies = (sortBy) => {
    const sortedMovies = [...movies].sort((a, b) => {
      const getValue = (movie, prop) => {
        if (prop === "title") return movie.Title.toLowerCase();
        if (prop === "year") return parseInt(movie.Year);
        return null;
      };
      const valueA = getValue(a, sortBy);
      const valueB = getValue(b, sortBy);
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    });
    setMovies(sortedMovies);
  };

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    setFilter(filterValue);
    if (filterValue) {
      sortMovies(filterValue);
    } else {
      setDisplayedMovies(movies.slice(0, 12));
    }
  };

  useEffect(() => {
    const initialSearches = ["action", "comedy", "drama", "sci-fi"];
    const loadInitialMovies = async () => {
      setLoading(true);
      const results = await Promise.all(
        initialSearches.map(fetchMoviesFromAPI)
      );
      let allInitialMovies = results.flat();
      const uniqueMoviesMap = new Map(
        allInitialMovies.map((movie) => [movie.imdbID, movie])
      );
      allInitialMovies = [...uniqueMoviesMap.values()];
      setMovies(allInitialMovies);
      setLoading(false);
    };

    const params = new URLSearchParams(location.search);
    const query = params.get("query");

    if (query) {
      setSearchTerm(query);
      handleSearch(query);
    } else {
      loadInitialMovies();
    }
  }, [location.search]);

  useEffect(() => {
    if (searchInputRef.current) {
      const searchInput = searchInputRef.current;
      searchInput.addEventListener("keypress", handleKeyPress);

      return () => {
        searchInput.removeEventListener("keypress", handleKeyPress);
      };
    }
  }, [searchTerm, handleKeyPress]);

  useEffect(() => {
    setDisplayedMovies(movies.slice(0, 12));
  }, [movies]);

  return (
    <>
      <Nav />
      <header className="movie__header--section">
        <div className="container header__container">
          <div className="header__content">
            <h1>Browse Our Movies</h1>
            <div className="search-container">
              <input
                type="text"
                className="header__search"
                placeholder="Search for Movies"
                id="searchInput"
                ref={searchInputRef}
                onChange={handleInputChange}
                value={searchTerm}
              />
              <i
                className="fas fa-search"
                id="searchIcon"
                onClick={handleSearchIconClick}
              ></i>
            </div>
          </div>
        </div>
      </header>
      <main id="movie__main">
        <div className="container">
          <div className="row">
            <div className="movie__results--header">
              <h2>Search results:</h2>
              <select id="filter" value={filter} onChange={handleFilterChange}>
                <option value="">Filter By</option>
                <option value="title">Title</option>
                <option value="year">Year</option>
              </select>
            </div>
            <div className="user-list">{renderMovies(displayedMovies)}</div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Movie;
