import { useState } from "react";
import { ArrowDown, ArrowUpRight, Award, GraduationCap } from "lucide-react";
import { certificates, formatDate } from "../data/portfolio";
import { Eyebrow, PageMeta } from "../components/UI";

const categories = [
  "All learning",
  "AI & data",
  "Cloud & infrastructure",
  "Security",
  "Project management",
  "Technology",
  "Workspace",
];

export default function Certificates() {
  const [filter, setFilter] = useState("All learning");
  const selected = certificates.filter(
    (item) => filter === "All learning" || item.category === filter,
  );
  return (
    <>
      <PageMeta
        title="Education & professional development"
        description="Simon Stirling’s Computer Science degree and professional development in generative AI, cloud architecture, cybersecurity and project management."
      />
      <section className="page-intro shell">
        <Eyebrow>EDUCATION & PROFESSIONAL DEVELOPMENT</Eyebrow>
        <h1>
          AI, cloud &<br />
          <span>continuous learning.</span>
        </h1>
        <p>
          Selected courses and specialisations supporting my work in solution
          architecture, customer enablement and technical delivery. Credential
          types and available verification links are shown for each entry.
        </p>
        <div className="education-summary">
          <div>
            <GraduationCap size={23} />
            <div>
              <strong>BSc Computer Science</strong>
              <span>University of the People</span>
            </div>
          </div>
          <div>
            <Award size={23} />
            <div>
              <strong>Historical Microsoft credentials</strong>
              <span>MCPD, MCTS and MCP</span>
            </div>
          </div>
        </div>
      </section>
      <section className="shell collection-section">
        <div className="collection-toolbar">
          <div className="filter-buttons" aria-label="Filter learning">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                aria-pressed={filter === category}
                className={filter === category ? "selected" : ""}
              >
                {category}
              </button>
            ))}
          </div>
          <span className="result-count" role="status">
            {selected.length}{" "}
            {selected.length === 1 ? "learning record" : "learning records"}
          </span>
        </div>
        <div className="certificate-list">
          {selected.map((item) => (
            <article className="certificate-item" key={item.id}>
              <span className="certificate-icon">
                <GraduationCap size={25} />
              </span>
              <div className="certificate-main">
                <div className="certificate-meta">
                  <span>{item.issuer}</span>
                  {item.date && (
                    <time dateTime={item.date}>{formatDate(item.date)}</time>
                  )}
                  <span>{item.type}</span>
                </div>
                <h2>{item.title}</h2>
                <div className="tags">
                  {item.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
              <div className="certificate-links">
                {item.url && (
                  <a
                    className="text-link"
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View credential
                    <ArrowUpRight size={15} />
                  </a>
                )}
                {item.file && (
                  <a href={item.file} target="_blank" rel="noopener noreferrer">
                    View certificate PDF
                    <ArrowDown size={14} />
                  </a>
                )}
                {!item.url && (
                  <span className="course-completion">
                    Completed Academy module
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
        <p className="credential-note">
          The AWS entry is a Coursera specialisation. The Anthropic entries
          record completed Academy modules. Course completions and historical
          credentials are described by the type awarded.
        </p>
      </section>
    </>
  );
}
