import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link, useResolvedPath } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaDribbble,
  FaGithub,
} from "react-icons/fa";
import { TextCarousel } from "../Items/TextCarousel";

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
        <Link to="/" className="logo me-2">
          <img
            src={headerData.imageThumb}
            width={70}
            height={70}
            className="rounded"
            alt={headerData.name}
          />
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
          className="close ms-2"
          aria-label="Close"
          onClick={toggleHandler}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="header-inner d-flex align-items-start flex-column">
          <Link to="/">
            <img
              src={headerData.imageThumb}
              width={70}
              height={70}
              alt={headerData.name}
              className="rounded"
            />
          </Link>
          <Link to="/" className="site-title mt-3">
            {headerData.name}
          </Link>

          <span className="site-slogan">
            <TextCarousel phrases={headerData.designations} />
          </span>

          <nav>
            <ul className="vertical-menu scrollspy">
              <li>
                {currentPath === "/" ? (
                  <ScrollLink
                    activeClass="active"
                    to="section-home"
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                  >
                    <i className="icon-home"></i>Home
                  </ScrollLink>
                ) : (
                  <Link to="/">
                    <i className="icon-home"></i>Home
                  </Link>
                )}
              </li>
              <li>
                {currentPath === "/" ? (
                  <ScrollLink
                    activeClass="active"
                    to="section-about"
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                  >
                    <i className="icon-user"></i>About
                  </ScrollLink>
                ) : (
                  <Link to="/">
                    <i className="icon-user"></i>About
                  </Link>
                )}
              </li>
              <li>
                {currentPath === "/" ? (
                  <ScrollLink
                    activeClass="active"
                    to="section-services"
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                  >
                    <i className="icon-bulb"></i>Services
                  </ScrollLink>
                ) : (
                  <Link to="/">
                    <i className="icon-bulb"></i>Services
                  </Link>
                )}
              </li>
              <li>
                {currentPath === "/" ? (
                  <ScrollLink
                    activeClass="active"
                    to="section-experiences"
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                  >
                    <i className="icon-graduation"></i>Resume
                  </ScrollLink>
                ) : (
                  <Link to="/">
                    <i className="icon-graduation"></i>Resume
                  </Link>
                )}
              </li>
              {/* <li>
                {currentPath === "/" ? (
                  <ScrollLink
                    activeClass="active"
                    to="section-portfolios"
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                  >
                    <i className="icon-grid"></i>Works
                  </ScrollLink>
                ) : (
                  <Link to="/">
                    <i className="icon-grid"></i>Works
                  </Link>
                )}
              </li> */}
              <li>
                {currentPath === "/" ? (
                  <ScrollLink
                    activeClass="active"
                    to="section-blogs"
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                  >
                    <i className="icon-pencil"></i>Blog
                  </ScrollLink>
                ) : (
                  <Link to="/blogs">
                    <i className="icon-pencil"></i>Blog
                  </Link>
                )}
              </li>
              <li>
                {currentPath === "/" ? (
                  <ScrollLink
                    activeClass="active"
                    to="section-contact"
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                  >
                    <i className="icon-phone"></i>Contact
                  </ScrollLink>
                ) : (
                  <Link to="/">
                    <i className="icon-phone"></i>Contact
                  </Link>
                )}
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
