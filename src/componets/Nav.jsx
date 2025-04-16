import React from "react";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <div className="home__wrapper">
      <section id="landing">
        <nav>
          <div className="row nav__row">
            <div className="nav__logo">
              <img src={logo} className="nav__logo--img" alt="logo" />
              <div className="nav__logo--title">Movie Knowledge</div>
            </div>
            <div className="nav__links">
              <Link to="/" className="nav__link link__hover-effect">
                Home
              </Link>
              <Link to="/Movie" className="nav__link link__hover-effect">
                Find your Movie
              </Link>
              <Link to="#" className="nav__link nav__link--primary">
                Contact
              </Link>
            </div>
          </div>
        </nav>
      </section>
    </div>
  );
};

export default Nav;
