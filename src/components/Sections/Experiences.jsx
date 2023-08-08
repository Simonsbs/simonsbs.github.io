import React from "react";
import Experience from "../Items/Experience";

const experiencesData = [
  {
    id: 1,
    year: "2005 - Present",
    degree: "Manager and Co-Partner in 2 Technology Companies",
    content:
      "Lead and manage software and electronics projects at Flame-Ware Solutions and Brama, overseeing project lifecycles, team coordination, and client support.",
  },
  {
    id: 2,
    year: "2023 - Present",
    degree: "Technology and Programming Lecturer, Hacker-U College",
    content:
      "Teach and mentor students in various technologies and development environments, engaging in curriculum development and improvement.",
  },
  {
    id: 3,
    year: "2004 - 2005",
    degree: "CoolVision - Head of Development Team",
    content:
      "Analyzed and characterized a global social networking site using live video broadcasting technology, leading a team of developers and database experts.",
  },
  {
    id: 4,
    year: "2000 - 2004",
    degree:
      "Military Service (IDF) - Medical Corps - Development Team leader And Head of Systems Analysis and Development",
    content:
      "Analyzed, characterized, and developed client/server systems for human resources, office management, and unit/personnel deployment, and instructed computer applications and system usage.",
  },
];

function Experiences() {
  return (
    <div className="timeline">
      {experiencesData.map((experience) => (
        <Experience experience={experience} key={experience.id} />
      ))}
      <span className="timeline-line"></span>
    </div>
  );
}

export default Experiences;
