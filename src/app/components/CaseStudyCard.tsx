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

export default function CaseStudyCard({
  study,
  detailed = false,
}: {
  study: CaseStudy;
  detailed?: boolean;
}) {
  const Icon = icons[study.id as keyof typeof icons] || Database;
  return (
    <article
      className={`case-study-card${detailed ? " case-study-detailed" : ""}`}
    >
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
      <h3>{study.title}</h3>
      <p>{study.summary}</p>
      {detailed ? (
        <>
          <span className="case-study-role">{study.role}</span>
          <div className="case-study-detail">
            <h4>My contribution</h4>
            <p>{study.contribution}</p>
            <h4>Result</h4>
            <p>{study.outcome}</p>
          </div>
        </>
      ) : (
        <Link to="/projects" className="text-link">
          Read the delivery example
          <ArrowUpRight size={16} />
        </Link>
      )}
      <div className="tags">
        {study.technologies.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </article>
  );
}
