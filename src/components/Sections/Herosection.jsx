import React from "react";
import { Link as ScrollLink } from "react-scroll";

const herosectionData = {
  name: "Simon B.Stirling",
  aboutMe:
    "Over 20 years of experience in system analysis, development, and management across various industries. Seeking a senior technology or management position to drive innovation and success.",
};

function Herosection() {
  return (
    <section className="hero background parallax shadow-dark d-flex align-items-center">
      <div className="cta mx-auto mt-2">
        <h1 className="mt-0 mb-4">I’m {herosectionData.name}</h1>
        <p className="mb-4">{herosectionData.aboutMe}</p>
        <ScrollLink
          activeClass="active"
          to="section-services"
          spy={true}
          smooth={true}
          duration={500}
          offset={50}
          className="btn btn-default btn-lg me-3"
        >
          <i className="icon-grid"></i>Services
        </ScrollLink>
        <div
          className="spacer d-md-none d-lg-none d-sm-none"
          data-height="10"
        ></div>
        <ScrollLink
          activeClass="active"
          to="section-contact"
          spy={true}
          smooth={true}
          duration={500}
          offset={50}
          className="btn btn-border-light btn-lg"
        >
          <i className="icon-envelope"></i>Contact me
        </ScrollLink>
      </div>
      <div className="overlay"></div>
    </section>
  );
}

export default Herosection;
