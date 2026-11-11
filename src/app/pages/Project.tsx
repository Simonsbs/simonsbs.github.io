import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  FlaskConical,
  GitBranch,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import type { CSSProperties } from "react";
import { PageMeta } from "../components/UI";
import { Github } from "../components/BrandIcons";
import ArchitectureBoard from "../components/ArchitectureBoard";
import { projectPath, standaloneProjects } from "../data/standalone";
import "../projects.css";

export default function Project() {
  const { projectId } = useParams();
  const index = standaloneProjects.findIndex((p) => p.id === projectId),
    project = standaloneProjects[index];
  if (!project)
    return (
      <section className="shell not-found">
        <PageMeta
          title="Project not found"
          description="Explore Simon Stirling's five independent engineering demonstrators."
        />
        <h1>Project not found.</h1>
        <Link className="button button-primary" to="/projects">
          Browse the projects
          <ArrowRight size={16} />
        </Link>
      </section>
    );
  function jump(section: string) {
    const target = document.getElementById(section);
    target?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
    target?.focus({ preventScroll: true });
  }
  const next = standaloneProjects[(index + 1) % standaloneProjects.length];
  return (
    <div
      className="project-page"
      style={{ "--project-color": project.color } as CSSProperties}
    >
      <PageMeta title={project.title} description={project.summary} />
      <section className="shell project-intro">
        <Link to="/projects" className="project-back">
          <ArrowLeft size={15} />
          All projects
        </Link>
        <div className="project-eyebrow">
          <span>{project.number} / INDEPENDENT ENGINEERING DEMONSTRATOR</span>
          <span className="project-live">
            <i />
            Public without sign-in
          </span>
        </div>
        <div className="project-hero-grid">
          <div>
            <span className="project-focus">{project.focus}</span>
            <h1>
              {project.name}
              <span>{project.headline}</span>
            </h1>
            <p className="project-lede">{project.summary}</p>
            <div className="project-actions">
              <a
                className="button button-primary"
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open live demo
                <ArrowUpRight size={17} />
              </a>
              <a
                className="button project-source"
                href={project.repository}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={17} />
                View repository
              </a>
              <button
                className="text-link"
                onClick={() => jump("architecture")}
              >
                See the architecture
                <ArrowDown size={16} />
              </button>
            </div>
          </div>
          <aside className="project-brief">
            <div className="section-kicker">THE PROJECT BRIEF</div>
            <h2>What should this help someone do?</h2>
            <p>{project.goal}</p>
            <dl>
              <div>
                <dt>Runtime</dt>
                <dd>{project.runtime}</dd>
              </div>
              <div>
                <dt>Demo mode</dt>
                <dd>{project.mode}</dd>
              </div>
            </dl>
          </aside>
        </div>
        <nav className="project-jump" aria-label="Project page sections">
          {[
            ...(project.walkthrough
              ? [["walkthrough", "Watch walkthrough"]]
              : []),
            ["capabilities", "What it does"],
            ["architecture", "Architecture board"],
            ["how-to-use", "How to use it"],
            ["design-decisions", "Design decisions"],
            ["project-validation", "Validation & scope"],
          ].map(([target, label]) => (
            <button key={target} onClick={() => jump(target)}>
              {label}
            </button>
          ))}
        </nav>
      </section>
      {!project.walkthrough && (
        <section
          className="shell project-preview"
          aria-label={`${project.name} application preview`}
        >
          <figure>
            <img
              src={project.screenshot.src}
              alt={project.screenshot.alt}
              width="1200"
              height="800"
              loading="lazy"
            />
            <figcaption>
              The public application with synthetic example data.
            </figcaption>
          </figure>
        </section>
      )}
      {project.walkthrough && (
        <section
          className="shell project-video"
          id="walkthrough"
          tabIndex={-1}
          aria-labelledby="walkthrough-title"
        >
          <div className="project-section-heading">
            <div>
              <div className="section-kicker">WATCH THE APPLICATION</div>
              <h2 id="walkthrough-title">From failed delivery to recovery.</h2>
            </div>
            <p>
              {project.walkthrough.duration}. Real application screenshots,
              synthetic narration, English captions and a full transcript.
            </p>
          </div>
          <video
            aria-label={`${project.name} narrated walkthrough`}
            controls
            playsInline
            preload="none"
            poster={project.walkthrough.poster}
            width="1280"
            height="960"
          >
            <source src={project.walkthrough.video} type="video/mp4" />
            <track
              kind="captions"
              src={project.walkthrough.captions}
              srcLang="en"
              label="English"
            />
            Your browser cannot play this video.{" "}
            <a href={project.walkthrough.video}>Download the walkthrough</a> or
            read the transcript below.
          </video>
          <details className="walkthrough-transcript">
            <summary>Read the walkthrough transcript</summary>
            {project.walkthrough.transcript.map((scene) => (
              <div key={scene.title}>
                <h3>{scene.title}</h3>
                <p>{scene.text}</p>
              </div>
            ))}
          </details>
        </section>
      )}
      <section
        id="capabilities"
        tabIndex={-1}
        className="shell project-capabilities"
      >
        <div className="project-section-heading">
          <div className="section-kicker">01 / FUNCTION & ABILITIES</div>
          <h2>{project.headline}</h2>
        </div>
        <div className="project-capability-grid">
          {project.capabilities.map((c, i) => (
            <article key={c.title}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section
        id="architecture"
        tabIndex={-1}
        className="shell project-architecture"
      >
        <div className="project-section-heading">
          <div>
            <div className="section-kicker">
              02 / PLANNED BOUNDARIES, VISIBLE FLOW
            </div>
            <h2>
              From the whiteboard
              <br />
              <span>to a working application.</span>
            </h2>
          </div>
          <p>
            Play a scenario, step through the decisions or select a component to
            inspect its responsibility. The diagrams follow the implemented
            design.
          </p>
        </div>
        <ArchitectureBoard key={project.id} project={project} />
      </section>
      <section
        id="how-to-use"
        tabIndex={-1}
        className="shell project-walkthrough"
      >
        <div className="project-section-heading">
          <div>
            <div className="section-kicker">03 / A FIVE-MINUTE WALKTHROUGH</div>
            <h2>Try it for yourself.</h2>
          </div>
          <a
            className="text-link"
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
          >
            Keep the live demo open
            <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="walkthrough-layout">
          <ol className="project-instructions">
            {project.instructions.map((s, i) => (
              <li key={s.title}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <aside className="walkthrough-note">
            <FlaskConical size={26} strokeWidth={1.3} />
            <h3>A working demonstrator.</h3>
            <p>
              Use the public synthetic examples to inspect the behaviour. The
              repository contains setup instructions, implementation decisions
              and recorded validation.
            </p>
            <a
              href={project.repository + "#readme"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Local setup & full README
              <ArrowUpRight size={15} />
            </a>
            <span>
              All customer scenarios and operational records are synthetic.
            </span>
          </aside>
        </div>
      </section>
      <section
        id="design-decisions"
        tabIndex={-1}
        className="shell project-decisions"
      >
        <div className="project-section-heading">
          <div className="section-kicker">04 / ENGINEERING JUDGEMENT</div>
          <h2>Why it works this way.</h2>
        </div>
        <div className="decision-grid">
          {project.decisions.map((d) => (
            <article key={d.title}>
              <GitBranch size={21} strokeWidth={1.4} />
              <h3>{d.title}</h3>
              <p>{d.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section
        id="project-validation"
        tabIndex={-1}
        className="shell project-validation"
      >
        <div className="validation-evidence">
          <div className="section-kicker">05 / INSPECT THE EVIDENCE</div>
          <h2>
            Tested behaviour.
            <br />
            <span>Explicit limits.</span>
          </h2>
          <ul>
            {project.evidence.map((e) => (
              <li key={e}>
                <Check size={16} />
                <p>{e}</p>
              </li>
            ))}
          </ul>
          <a
            className="text-link"
            href={`${project.repository}/blob/main/${project.validationPath}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the recorded validation
            <ArrowUpRight size={16} />
          </a>
        </div>
        <aside>
          <Code2 size={25} />
          <h3>Scope of this project</h3>
          {project.limits.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </aside>
      </section>
      <nav
        className="shell project-next"
        aria-label="Other standalone projects"
      >
        <Link to="/projects">
          <ArrowLeft size={16} />
          All five projects
        </Link>
        <Link to={projectPath(next.id)}>
          <span>
            EXPLORE NEXT<strong>{next.name}</strong>
          </span>
          <ArrowRight size={24} />
        </Link>
      </nav>
    </div>
  );
}
