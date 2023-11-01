import React from "react";
import { Link } from "react-router-dom";
import Project from "../Items/Project";
import { useProjects } from "../../contexts/ProjectContext";

function Projects() {
  const recentProjects = useProjects().slice(0, 3);

  return (
    <>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {recentProjects.map((project) => (
          <div className="col" key={project.id}>
            <Project project={project} />
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center mt-5">
        <Link to="/projects/" className="btn btn-primary">
          <i className="bi bi-box-arrow-in-right"></i> Show All Projects
        </Link>
      </div>
    </>
  );
}

export default Projects;
