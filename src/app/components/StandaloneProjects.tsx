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
export default function StandaloneProjects() {
  return (
    <section
      className="standalone-collection"
      aria-label="Five standalone engineering projects"
    >
      <div className="standalone-heading">
        <div>
          <div className="section-kicker">BUILT TO BE EXPLORED / 01 TO 05</div>
          <h2>
            Five independent projects.
            <br />
            <span>Open the hood.</span>
          </h2>
        </div>
        <p>
          Each has its own live application and repository. Explore what it
          does, try the walkthrough and follow its architecture on an animated
          whiteboard.
        </p>
      </div>
      <div className="standalone-grid">
        {standaloneProjects.map((project, i) => {
          const Icon = icons[i];
          return (
            <article
              className="standalone-card"
              key={project.id}
              style={{ "--project-color": project.color } as CSSProperties}
            >
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
