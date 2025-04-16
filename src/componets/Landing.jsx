import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Movie__logo from "../assets/Movie_Knowledge_logo.jpg";

function Landing() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      navigate(`/movie?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <>
      <section className="main main__hero">
        <div className="container">
          <div className="row main__row">
            <h1 className="hero__title">
              America's premier source for movie knowledge
            </h1>

            <div className="search-container hero__search-container">
              <input
                type="text"
                className="header__search hero__search-input"
                placeholder="Search for Movies"
                id="searchInput"
                value={searchTerm}
                onChange={handleSearchInputChange}
                onKeyPress={handleKeyPress}
              />
              <i
                className="fas fa-search hero__search-icon"
                id="searchIcon"
                onClick={handleSearchSubmit}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
            <img src={Movie__logo} className="hero__img" alt="" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Landing;
