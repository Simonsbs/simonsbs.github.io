import React from "react";
import { Link as ScrollLink } from "react-scroll";
import GeneralInfo from "../../contexts/GeneralInfo";

function About() {
  return (
    <div className="row">
      <div className="col-md-3">
        <img
          src={GeneralInfo.image}
          width={150}
          height={150}
          className="rounded"
          alt={GeneralInfo.name}
        />
      </div>
      <div className="col-md-9">
        <h2 className="mt-4 mt-md-0 mb-4">Hello,</h2>
        <p className="mb-0">{GeneralInfo.aboutMe}</p>
        <div className="row my-4">
          <div className="col-md-6">
            <p className="mb-2">
              Name: <span className="text-dark">{GeneralInfo.name}</span>
            </p>
            <p className="mb-2">
              Birthday:{" "}
              <span className="text-dark">{GeneralInfo.birthday}</span>
            </p>
            <p className="mb-0">
              Phone:{" "}
              <span className="text-dark">
                {GeneralInfo.phone.map((singlePhone, index) => (
                  <span key={index}>
                    <a href={"tel:" + singlePhone}>{singlePhone}</a>
                  </span>
                ))}
              </span>
            </p>
          </div>
          <div className="col-md-6 mt-2 mt-md-0 mt-sm-2">
            <p className="mb-2">
              Location:{" "}
              <span className="text-dark">{GeneralInfo.location}</span>
            </p>
            <p className="mb-0">
              Email:{" "}
              <span className="text-dark">
                {GeneralInfo.email.map((singleEmail, index) => (
                  <span key={index}>
                    <a href={"mailto:" + singleEmail}>{singleEmail}</a>
                  </span>
                ))}
              </span>
            </p>
          </div>
        </div>
        <a href={GeneralInfo.cvpath} className="btn btn-default me-3">
          <i className="icon-cloud-download"></i>Download CV
        </a>
        <ScrollLink
          activeClass="active"
          to="section-contact"
          spy={true}
          smooth={true}
          duration={500}
          offset={50}
          className="btn btn-alt mt-2 mt-md-0 mt-xs-2"
        >
          <i className="icon-envelope"></i>Contact me
        </ScrollLink>
      </div>
    </div>
  );
}

export default About;
