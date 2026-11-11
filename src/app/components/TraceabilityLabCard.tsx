import { ArrowUpRight, Factory, ClipboardCheck } from "lucide-react";

export default function TraceabilityLabCard() {
  return (
    <a
      href="https://traceability.bestdev.co.il/"
      target="_blank"
      rel="noopener noreferrer"
      className="knowledge-lab-card"
    >
      <div className="knowledge-card-icon"><Factory size={29} strokeWidth={1.4} /></div>
      <div>
        <span className="section-kicker">STANDALONE PROJECT / SYNTHETIC DATA</span>
        <h3>Manufacturing data quality & traceability lab</h3>
        <p>Ingest synthetic readings, investigate data quality findings and follow a reviewed correction from the original source to its current value.</p>
        <span className="knowledge-card-meta"><ClipboardCheck size={14} /> traceability.bestdev.co.il · Public demo & source</span>
      </div>
      <ArrowUpRight size={23} className="knowledge-card-arrow" />
    </a>
  );
}
