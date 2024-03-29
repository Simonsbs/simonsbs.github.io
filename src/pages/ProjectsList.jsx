import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Helmet } from "react-helmet";
import "./Bloglist.css";
import { useProjects } from "../contexts/ProjectContext";
import Project from "../components/Items/Project";

function ProjectsList() {
  const data = useProjects();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Simon B.Stilring - Projects</title>
        <meta name="description" content="A list of my projects." />
      </Helmet>
      <section className="shadow-blue white-bg padding mt-0">
        <h1 className="pb-2">A few of my Projects</h1>
        <div className="row -mt-50">
          {data.map((project) => (
            <div className="col-md-6 mt-50 equal-height" key={project.id}>
              <Project project={project} />
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default ProjectsList;
