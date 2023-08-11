import React, { useEffect, useState } from "react";
import { Link, useResolvedPath } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaDribbble,
  FaGithub,
} from "react-icons/fa";
import { TextCarousel } from "../Items/TextCarousel";
import { HashLink } from "react-router-hash-link";

const headerData = {
  name: "Simon B.Stirling",
  designations: [
    "CTO",
    "R&D Manager",
    "Solution Architect",
    "Project Manager",
    "Team Leader",
    "Instructor",
    "Full Stack Developer",
  ],
  imageThumb: "/images/logo.png",
  social: {
    facebook: "https://www.facebook.com/simonsbs",
    twitter: "https://twitter.com/simonsbs",
    instagram: "https://www.instagram.com/simonsbs/",
    github: "https://github.com/Simonsbs/",
  },
};

function Header({ toggleHeader, toggleHandler }) {
  const [currentPath, setCurrentPath] = useState("");
  const match = useResolvedPath("");

  useEffect(() => {
    setCurrentPath(match.pathname);
  }, [match]);

  const checkIfToggleNeeded = (e) => {
    if (toggleHeader) {
      toggleHandler(e);
    }
  };

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
        <Link to="/" onClick={toggleHandler} className="logo me-2">
          <img
            src={headerData.imageThumb}
            width={70}
            height={70}
            className="rounded"
            alt={headerData.name}
          />
        </Link>
        <Link to="/" onClick={toggleHandler} className="site-title mb-2">
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
          className="close ms-2"
          aria-label="Close"
          onClick={checkIfToggleNeeded}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="header-inner d-flex align-items-start flex-column">
          <Link to="/" onClick={checkIfToggleNeeded}>
            <img
              src={headerData.imageThumb}
              width={70}
              height={70}
              alt={headerData.name}
              className="rounded"
            />
          </Link>
          <Link
            to="/"
            onClick={checkIfToggleNeeded}
            className="site-title mt-3"
          >
            {headerData.name}
          </Link>

          <span className="site-slogan">
            <TextCarousel phrases={headerData.designations} />
          </span>

          <nav>
            <ul className="vertical-menu scrollspy">
              <li>
                <Link to="/" onClick={checkIfToggleNeeded}>
                  <i className="icon-home"></i>Home
                </Link>
              </li>
              <li>
                <HashLink to="/about" onClick={checkIfToggleNeeded}>
                  <i className="icon-user"></i>About
                </HashLink>
              </li>
              <li>
                <HashLink to="/services" onClick={checkIfToggleNeeded}>
                  <i className="icon-bulb"></i>Services
                </HashLink>
              </li>
              <li>
                <HashLink to="/resume" onClick={checkIfToggleNeeded}>
                  <i className="icon-graduation"></i>Resume
                </HashLink>
              </li>
              <li>
                {currentPath.startsWith("/blog/") ? (
                  <HashLink to="/blog/" onClick={checkIfToggleNeeded}>
                    <i className="icon-pencil"></i>Blog
                  </HashLink>
                ) : (
                  <HashLink to="/blogpreview" onClick={checkIfToggleNeeded}>
                    <i className="icon-pencil"></i>Blog
                  </HashLink>
                )}
              </li>
              <li>
                <Link to="/contact" onClick={checkIfToggleNeeded}>
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
              {!headerData.social.github ? null : (
                <li className="list-inline-item">
                  <a href={headerData.social.github}>
                    <FaGithub />
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

            {/* <span className="copyright">
              &copy; {new Date().getFullYear()} Bako Template
            </span> */}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
