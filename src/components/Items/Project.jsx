import React from "react";

function Project({ project }) {
  return (
    <div className="card h-100 shadow-sm bg-white rounded">
      <img
        src={project.imageUrl}
        className="card-img-top border rounded"
        alt={project.title}
      />
      <div className="card-body">
        <h5 className="card-title">{project.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{project.subtitle}</h6>
        <p className="card-text">{project.description}</p>
      </div>
      <ul className="list-group list-group-flush">
        {/* <li className="list-group-item">
          <i className="bi bi-calendar"></i>{" "}
          {new Date(project.date).toLocaleDateString()}
        </li> */}
        <li className="list-group-item">
          <strong>Categories:</strong> {project.categories.join(", ")}
        </li>
      </ul>

      <div className="card-body">
        <a
          href={project.projectUrl}
          className="btn btn-outline-primary btn-sm w-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-box-arrow-up-right"></i> Visit Project
        </a>
      </div>
    </div>
  );
}

export default Project;
