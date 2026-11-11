import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Factory,
  FileSearch,
  GitBranch,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Github } from "./BrandIcons";
import { projectPath, standaloneProjects } from "../data/standalone";
import type { CSSProperties } from "react";
const icons = [FileSearch, GitBranch, Boxes, Factory, ShieldCheck];
export default function StandaloneProjects({
  featured = false,
}: {
  featured?: boolean;
}) {
  const selected = featured
    ? ["presales-workbench", "knowledge-lab", "integration-lab"].map((id) =>
        standaloneProjects.find((project) => project.id === id)!,
      )
    : standaloneProjects;
  return (
    <section
      className="standalone-collection"
      aria-label={
        featured
          ? "Selected live demonstrations"
          : "Five standalone engineering projects"
      }
    >
      <div className="standalone-heading">
        <div>
          <div className="section-kicker">
            INDEPENDENT BUILDS / SYNTHETIC DATA
          </div>
          <h2>
            {featured ? "Selected live demos." : "Five independent projects."}
            <br />
            <span>Try the decisions yourself.</span>
          </h2>
        </div>
        <p>
          {featured
            ? "Compare a proposal, inspect retrieval evidence or recover a failed integration. Each build has source code and an architecture walkthrough."
            : "Each has its own live application, repository, usage guide and architecture walkthrough. These synthetic demonstrations are separate from customer delivery."}
          {featured && (
            <Link className="text-link standalone-view-all" to="/projects">
              Explore all five demos
              <ArrowRight size={16} />
            </Link>
          )}
        </p>
      </div>
      <div className="standalone-grid">
        {selected.map((project) => {
          const Icon =
            icons[
              standaloneProjects.findIndex((item) => item.id === project.id)
            ];
          return (
            <article
              className="standalone-card"
              key={project.id}
              style={{ "--project-color": project.color } as CSSProperties}
            >
              <Link
                className="standalone-preview"
                to={projectPath(project.id)}
                tabIndex={-1}
                aria-hidden="true"
              >
                <img
                  src={project.screenshot.src}
                  alt=""
                  width="1200"
                  height="800"
                  loading="lazy"
                />
              </Link>
              <div className="standalone-card-top">
                <span className="standalone-number">{project.number}</span>
                <Icon size={26} strokeWidth={1.3} />
                <span className="standalone-public">
                  <i />
                  Public demo
                </span>
              </div>
              <div className="standalone-focus">{project.focus}</div>
              <h3>
                <Link to={projectPath(project.id)}>
                  {project.name}
                  <ArrowUpRight size={22} />
                </Link>
              </h3>
              <p>{project.summary}</p>
              <Link className="standalone-explore" to={projectPath(project.id)}>
                Explore project & architecture
                <ArrowRight size={16} />
              </Link>
              <div className="standalone-card-links">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live demo
                  <ArrowUpRight size={13} />
                </a>
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={13} />
                  Repository
                  <ArrowUpRight size={12} />
                </a>
                <span>Synthetic data</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
