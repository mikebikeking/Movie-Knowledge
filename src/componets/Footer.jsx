import React from "react";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer__container">
      <div className="row footer__row">
        <figure>
          <Link to="/">
            <img className="footer__logo--img" src={logo} alt="" />
          </Link>
        </figure>
        <div className="footer__list">
          <Link to="/" className="footer__link link__hover-effect">
            Home
          </Link>
          <Link to="/Movie" className="footer__link link__hover-effect">
            Find your Movie
          </Link>
          <Link to="#" className="footer__link link__hover-effect">
            Contact
          </Link>
        </div>
        <div className="footer__copyright">Copyright © 2025 Michael King</div>
      </div>
    </div>
  );
}

export default Footer;
