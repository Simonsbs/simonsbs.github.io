import {
  Bot,
  Cloud,
  Database,
  FileSearch,
  Headset,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { CaseStudy } from "../data/portfolio";

const icons = {
  "enterprise-document-ai": Bot,
  "cloud-discovery-to-delivery": Cloud,
  "manufacturing-quality-data": Database,
  "document-rag-prototype": FileSearch,
  "enterprise-service-support": Headset,
};

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  const Icon = icons[study.id as keyof typeof icons] || Database;
  return (
    <article className="case-study-card">
      <div className="case-study-top">
        <Icon size={28} strokeWidth={1.4} />
        <span
          className={
            study.status === "Production"
              ? "case-status production"
              : "case-status"
          }
        >
          {study.status}
        </span>
      </div>
      <span className="case-study-category">{study.category}</span>
      <h3>
        <Link to={`/case-studies/${study.id}`}>{study.title}</Link>
      </h3>
      <p>{study.summary}</p>
      <p className="case-card-result">
        <strong>Result</strong>
        {study.outcome}
      </p>
      <Link
        to={`/case-studies/${study.id}`}
        className="text-link"
        aria-label={`Read the case study: ${study.title}`}
      >
        Read the delivery example
        <ArrowUpRight size={16} />
      </Link>
      <div className="tags">
        {study.technologies.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </article>
  );
}
