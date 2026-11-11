import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Check,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { articlePath, formatDate } from "../data/portfolio";
import type { Article, Project } from "../data/portfolio";

export function PageMeta({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  useEffect(() => {
    document.title = `${title} | Simon Stirling`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
  }, [title, description]);
  return null;
}

export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <span className={`eyebrow${light ? " eyebrow-light" : ""}`}>
      <span />
      {children}
    </span>
  );
}

export function SectionHeading({
  number,
  eyebrow,
  title,
  children,
  link,
}: {
  number: string;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  link?: { to: string; label: string };
}) {
  return (
    <div className="section-heading">
      <div className="section-heading-main">
        <div className="section-kicker">
          <span>{number}</span>
          {eyebrow}
        </div>
        <h2>{title}</h2>
        {children && <p>{children}</p>}
      </div>
      {link && (
        <Link className="text-link" to={link.to}>
          {link.label}
          <ArrowUpRight size={18} />
        </Link>
      )}
    </div>
  );
}

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <article className={`project-card project-${project.id}`}>
      <a
        className="project-image"
        href={project.projectUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${project.title} (opens in a new tab)`}
      >
        <div className="project-visual-label">
          <span>Selected project</span>
          <span>0{index + 1}</span>
        </div>
        <div className="project-browser">
          <div className="browser-bar">
            <i />
            <i />
            <i />
            <span>{new URL(project.projectUrl).hostname}</span>
          </div>
          <img
            src={project.imageUrl}
            alt={`${project.title} application screenshot`}
            loading="lazy"
            width="800"
            height="520"
          />
        </div>
        <span className="project-open">
          <ArrowUpRight size={22} />
        </span>
      </a>
      <div className="project-meta">
        <span>{project.categories.join(" / ")}</span>
        <ExternalLink size={13} aria-hidden="true" />
      </div>
      <h3>
        <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
          {project.title}
          <ArrowUpRight size={22} />
        </a>
      </h3>
      <p>{project.description}</p>
    </article>
  );
}

export function ArticleCard({
  article,
  compact = false,
}: {
  article: Article;
  compact?: boolean;
}) {
  return (
    <article className={`article-card${compact ? " article-compact" : ""}`}>
      <Link
        to={articlePath(article)}
        className="article-image"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src={article.featureImage}
          alt=""
          loading="lazy"
          width="640"
          height="400"
        />
        <span className="article-image-arrow">
          <ArrowUpRight size={23} />
        </span>
      </Link>
      <div className="article-meta">
        <span>{article.category}</span>
        <span>{article.readingMinutes} min read</span>
      </div>
      <h3>
        <Link to={articlePath(article)}>{article.title}</Link>
      </h3>
      {!compact && <p>{article.excerpt}</p>}
      <time dateTime={new Date(article.date).toISOString().slice(0, 10)}>
        {formatDate(article.date)}
      </time>
    </article>
  );
}

export function EmptyState({
  title,
  children,
  onReset,
}: {
  title: string;
  children: ReactNode;
  onReset?: () => void;
}) {
  return (
    <div className="empty-state" role="status">
      <BookOpen size={30} />
      <h2>{title}</h2>
      <p>{children}</p>
      {onReset && (
        <button className="button button-secondary" onClick={onReset}>
          Reset filters
          <ArrowDown size={16} />
        </button>
      )}
    </div>
  );
}

export function CopyLink({
  copied,
  onClick,
}: {
  copied: boolean;
  onClick: () => void;
}) {
  return (
    <button className="button button-secondary button-small" onClick={onClick}>
      {copied ? <Check size={16} /> : <ExternalLink size={16} />}
      {copied ? "Link copied" : "Copy article link"}
    </button>
  );
}
