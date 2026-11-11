import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Github } from "../components/BrandIcons";
import { Link } from "react-router-dom";
import { caseStudies, profile, projects } from "../data/portfolio";
import { Eyebrow, PageMeta, ProjectCard } from "../components/UI";
import CaseStudyCard from "../components/CaseStudyCard";
import StandaloneProjects from "../components/StandaloneProjects";

const filters = [
  "All work",
  "Pre-sales",
  "Enterprise architecture",
  "Post-sales",
  "Technical evaluation",
];

export default function Work() {
  const [filter, setFilter] = useState("All work");
  const selected = caseStudies.filter(
    (study) => filter === "All work" || study.category === filter,
  );
  return (
    <>
      <PageMeta
        title="Standalone projects & delivery case studies"
        description="Five independent engineering projects with public demos, repositories, usage guides and animated architecture boards, alongside source-grounded professional delivery case studies."
      />
      <section className="page-intro shell">
        <Eyebrow>INDEPENDENT BUILDS & PROFESSIONAL DELIVERY</Eyebrow>
        <h1>
          Working projects.
          <br />
          <span>Visible decisions.</span>
        </h1>
        <div className="page-intro-bottom">
          <p>
            Five standalone applications, each with a public demo, source code,
            usage guide and animated architecture board. Professional delivery
            cases below describe my existing experience separately.
          </p>
          <a
            className="text-link"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={17} />
            Public code on GitHub
            <ArrowUpRight size={17} />
          </a>
        </div>
      </section>
      <div className="shell work-standalone">
        <StandaloneProjects />
      </div>
      <section
        className="shell collection-section"
        aria-label="Delivery case studies"
      >
        <div className="delivery-heading">
          <div className="section-kicker">PROFESSIONAL EXPERIENCE</div>
          <h2>Delivery case studies.</h2>
          <p>
            Source-grounded examples from customer discovery through
            implementation and support. Customer details are anonymised;
            production and proof-of-concept work are labelled.
          </p>
        </div>
        <div className="collection-toolbar">
          <div className="filter-buttons" aria-label="Filter case studies">
            {filters.map((item) => (
              <button
                key={item}
                className={filter === item ? "selected" : ""}
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <span className="result-count" role="status">
            {selected.length}{" "}
            {selected.length === 1 ? "case study" : "case studies"}
          </span>
        </div>
        <div className="case-studies-grid case-studies-detailed">
          {selected.map((study) => (
            <CaseStudyCard key={study.id} study={study} detailed />
          ))}
        </div>
        <div className="public-projects">
          <div>
            <div className="section-kicker">A PUBLIC API PROJECT</div>
            <h2>C.R.U.D Connect</h2>
            <p>
              A public example of API-backed application development with React,
              Node.js and AWS. My enterprise work above covers the broader
              architecture, customer delivery and support responsibilities.
            </p>
            <a
              className="text-link"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore the code and other experiments
              <ArrowUpRight size={17} />
            </a>
          </div>
          <div>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
        <div className="collection-footer">
          <p>
            Looking for this mix of customer understanding and engineering
            depth?
          </p>
          <Link to="/contact" className="button button-primary">
            Discuss a role
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
