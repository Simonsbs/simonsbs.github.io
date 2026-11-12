import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Github } from "../components/BrandIcons";
import { Link } from "react-router-dom";
import { caseStudies, profile } from "../data/portfolio";
import { Eyebrow, PageMeta } from "../components/UI";
import CaseStudyCard from "../components/CaseStudyCard";
import StandaloneProjects from "../components/StandaloneProjects";
import MobileAppCards from "../components/MobileAppCards";
import "../mobile-apps.css";

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
          Architecture in practice.
          <br />
          <span>Delivery you can explore.</span>
        </h1>
        <div className="page-intro-bottom">
          <p>
            Professional delivery cases explain my responsibilities and results.
            Five independent demonstrators let you inspect working applications,
            source code and architecture decisions using synthetic data.
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
      <section
        className="shell collection-section"
        aria-label="Delivery case studies"
      >
        <div className="delivery-heading">
          <div className="section-kicker">PROFESSIONAL EXPERIENCE</div>
          <h2>Delivery case studies.</h2>
          <p>
            Anonymised customer work and a document-retrieval proof of concept.
            Open a case for the problem, my contribution, design decisions and
            outcome.
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
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>
        <StandaloneProjects />
        <section
          className="mobile-apps-section"
          aria-labelledby="mobile-apps-heading"
        >
          <div className="delivery-heading">
            <div className="section-kicker">MOBILE APPS</div>
            <h2 id="mobile-apps-heading">Learning on a smaller screen.</h2>
            <p>
              Explore Math For Maya, my maths practice app for children, with its
              original app guide and support pages.
            </p>
          </div>
          <MobileAppCards />
        </section>
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
