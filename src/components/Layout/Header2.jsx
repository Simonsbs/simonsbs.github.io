import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaDribbble,
} from "react-icons/fa";

const headerData = {
  name: "Simon Stirling",
  designation: "Web Developer",
  imageThumb: "/images/logo.png",
  social: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://www.instagram.com/",
    youtue: "https://www.youtube.com/",
    dribbble: "https://dribbble.com/",
  },
};

function Header({ toggleHeader, toggleHandler }) {
  return (
    <>
      <div
        className={
          toggleHeader
            ? "mobile-header py-2 px-3 mt-4 push"
            : "mobile-header py-2 px-3 mt-4"
        }
      >
        <button className="menu-icon me-2" onClick={toggleHandler}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <Link to="/multipage" className="logo">
          <img src={headerData.imageThumb} alt={headerData.name} />
        </Link>
        <Link to="/" className="site-title mb-2">
          {headerData.name}
        </Link>
      </div>

      <header
        className={
          toggleHeader
            ? "left float-start shadow-dark open"
            : "left float-start shadow-dark"
        }
      >
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={toggleHandler}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="header-inner d-flex align-items-start flex-column">
          <Link to="/multipage">
            <img src={headerData.imageThumb} alt={headerData.name} />
          </Link>
          <Link to="/multipage" className="site-title mt-3">
            {headerData.name}
          </Link>

          <span className="site-slogan">{headerData.designation}</span>

          <nav>
            <ul className="vertical-menu scrollspy">
              <li>
                <Link to="/multipage">
                  <i className="icon-home"></i>Home
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <i className="icon-user"></i>About
                </Link>
              </li>
              <li>
                <Link to="/services">
                  <i className="icon-bulb"></i>Services
                </Link>
              </li>
              <li>
                <Link to="/resume">
                  <i className="icon-graduation"></i>Resume
                </Link>
              </li>
              <li>
                <Link to="/works">
                  <i className="icon-grid"></i>Works
                </Link>
              </li>
              <li>
                <Link to="/bloglist">
                  <i className="icon-pencil"></i>Blog
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <i className="icon-phone"></i>Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="footer mt-auto">
            <ul className="social-icons list-inline">
              {!headerData.social.facebook ? null : (
                <li className="list-inline-item">
                  <a href={headerData.social.facebook}>
                    <FaFacebookF />
                  </a>
                </li>
              )}
              {!headerData.social.twitter ? null : (
                <li className="list-inline-item">
                  <a href={headerData.social.twitter}>
                    <FaTwitter />
                  </a>
                </li>
              )}
              {!headerData.social.instagram ? null : (
                <li className="list-inline-item">
                  <a href={headerData.social.instagram}>
                    <FaInstagram />
                  </a>
                </li>
              )}
              {!headerData.social.youtue ? null : (
                <li className="list-inline-item">
                  <a href={headerData.social.youtue}>
                    <FaYoutube />
                  </a>
                </li>
              )}
              {!headerData.social.dribbble ? null : (
                <li className="list-inline-item">
                  <a href={headerData.social.dribbble}>
                    <FaDribbble />
                  </a>
                </li>
              )}
            </ul>

            <span className="copyright">
              &copy; {new Date().getFullYear()} Bako Template
            </span>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
