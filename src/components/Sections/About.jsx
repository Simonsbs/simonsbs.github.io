import React from "react";
import { Link as ScrollLink } from "react-scroll";

const aboutData = {
  cvpath: "media/Simon Stirling CV 2023 EN.pdf",
  image: "images/logo.png",
  name: "Simon B.Stirling",
  location: "Hadera, Israel",
  birthday: "9 November, 1980",
  email: "simonsbs@gmail.com",
  aboutMe:
    "I am Simon Stirling, a multifaceted technology professional hailing from Hadera, Israel. With over 20 years of experience in system analysis, development, and management, I have honed my skills across a wide spectrum of technologies and industries. As a CTO, Project Manager, Team Leader, Instructor, and Full Stack Developer, I have led and managed diverse projects, driving innovation and success. My expertise spans programming languages, databases, management methods, software, hardware, and cloud environments. Whether it's strategic planning, team leadership, or creative problem-solving, my approach is always guided by a commitment to excellence and adaptability. I'm seeking opportunities to leverage my extensive technical, managerial, and teaching experience to contribute to a technology-driven company. Let's explore how we can build the future together!",
};

function About() {
  return (
    <div className="row">
      <div className="col-md-3">
        <img
          src={aboutData.image}
          width={150}
          height={150}
          className="rounded"
          alt={aboutData.name}
        />
      </div>
      <div className="col-md-9">
        <h2 className="mt-4 mt-md-0 mb-4">Hello,</h2>
        <p className="mb-0">{aboutData.aboutMe}</p>
        <div className="row my-4">
          <div className="col-md-6">
            <p className="mb-2">
              Name: <span className="text-dark">{aboutData.name}</span>
            </p>
            <p className="mb-0">
              Birthday: <span className="text-dark">{aboutData.birthday}</span>
            </p>
          </div>
          <div className="col-md-6 mt-2 mt-md-0 mt-sm-2">
            <p className="mb-2">
              Location: <span className="text-dark">{aboutData.location}</span>
            </p>
            <p className="mb-0">
              Email: <span className="text-dark">{aboutData.email}</span>
            </p>
          </div>
        </div>
        <a href={aboutData.cvpath} className="btn btn-default me-3">
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
          <i className="icon-envelope"></i>Hire me
        </ScrollLink>
      </div>
    </div>
  );
}

export default About;
