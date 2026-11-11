import { ArrowLeft, ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { caseStudies, profile } from "../data/portfolio";
import details from "../data/case-study-details.json";
import { standaloneProjects, projectPath } from "../data/standalone";
import { Eyebrow, PageMeta } from "../components/UI";
import "../case-studies.css";

export default function CaseStudy() {
  const { caseId } = useParams();
  const study = caseStudies.find((item) => item.id === caseId);
  const detail = details[caseId as keyof typeof details];
  if (!study || !detail)
    return (
      <section className="shell not-found">
        <PageMeta
          title="Case study not found"
          description="Explore professional delivery cases and independent engineering projects."
        />
        <h1>Case study not found.</h1>
        <Link className="button button-primary" to="/projects">
          Browse the work
          <ArrowRight size={17} />
        </Link>
      </section>
    );
  const related = standaloneProjects.find(
    (project) => project.id === detail.relatedProject,
  );
  return (
    <>
      <PageMeta title={study.title} description={study.summary} />
      <section className="shell case-intro">
        <Link className="text-link" to="/projects">
          <ArrowLeft size={16} />
          All projects & case studies
        </Link>
        <div className="case-intro-meta">
          <Eyebrow>{study.category}</Eyebrow>
          <span
            className={`case-status${study.status === "Production" ? " production" : ""}`}
          >
            {study.status}
          </span>
        </div>
        <h1>{study.title}</h1>
        <p className="case-lede">{study.summary}</p>
        <dl className="case-facts">
          <div>
            <dt>My role</dt>
            <dd>{study.role}</dd>
          </div>
          <div>
            <dt>Delivery stage</dt>
            <dd>{study.status}</dd>
          </div>
          <div>
            <dt>Customer</dt>
            <dd>Anonymised</dd>
          </div>
        </dl>
      </section>
      <div className="shell case-story">
        <section className="case-problem">
          <div className="section-kicker">THE CUSTOMER PROBLEM</div>
          <h2>What needed to change.</h2>
          <p>{detail.problem}</p>
        </section>
        <section className="case-contribution">
          <div className="section-kicker">MY RESPONSIBILITY</div>
          <h2>What I owned.</h2>
          <p>{study.contribution}</p>
        </section>
        <section className="case-constraints">
          <div className="section-kicker">CONSTRAINTS & PRIORITIES</div>
          <h2>What shaped the approach.</h2>
          <ul>
            {detail.constraints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="case-architecture">
          <div className="section-kicker">ARCHITECTURE & DELIVERY</div>
          <h2>How the work fitted together.</h2>
          <ol className="case-flow">
            {detail.architecture.map((item, index) => (
              <li key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="case-decisions">
          <div className="section-kicker">TECHNICAL JUDGEMENT</div>
          <h2>Decisions and responsibilities.</h2>
          <div className="case-decision-grid">
            {detail.decisions.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="case-result">
          <div className="section-kicker">THE RESULT</div>
          <h2>What was delivered.</h2>
          <p>{study.outcome}</p>
          <div className="tags">
            {study.technologies.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>
        <aside className="case-scope">
          <h2>Scope of this example</h2>
          <p>{detail.scope}</p>
        </aside>
        {related && (
          <section className="case-related">
            <div>
              <div className="section-kicker">A RELATED INDEPENDENT BUILD</div>
              <h2>{related.name}</h2>
              <p>
                A separate demonstrator using synthetic data. Explore its
                implementation, design decisions and validation.
              </p>
            </div>
            <Link
              className="button button-secondary"
              to={projectPath(related.id)}
            >
              Explore the demonstrator
              <ArrowUpRight size={17} />
            </Link>
          </section>
        )}
        <div className="case-next">
          <Link className="text-link" to="/projects">
            <ArrowLeft size={16} />
            All delivery cases
          </Link>
          <a className="text-link" href={profile.cv} download>
            Download my CV
            <Download size={16} />
          </a>
          <Link className="button button-primary" to="/contact">
            Discuss a role
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </>
  );
}
