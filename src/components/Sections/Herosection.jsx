import React from "react";
import { Link as ScrollLink } from "react-scroll";
import GeneralInfo from "../../contexts/GeneralInfo";

function Herosection() {
  return (
    <section className="hero background parallax shadow-dark d-flex align-items-center">
      <div className="cta mx-auto mt-2">
        <h1 className="mt-0 mb-4">I’m {GeneralInfo.name}</h1>
        <p className="mb-4">{GeneralInfo.aboutMeShort}</p>
        <p className="fs-6 text-muted pb-4">
          {GeneralInfo.designations ? GeneralInfo.designations.join(" | ") : ""}
        </p>

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
