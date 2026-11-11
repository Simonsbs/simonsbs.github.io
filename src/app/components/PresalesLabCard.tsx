import { ArrowUpRight, Workflow, ClipboardCheck } from "lucide-react";

export default function PresalesLabCard() {
  return (
    <a
      href="https://presales.bestdev.co.il/"
      target="_blank"
      rel="noopener noreferrer"
      className="knowledge-lab-card"
    >
      <div className="knowledge-card-icon"><Workflow size={29} strokeWidth={1.4} /></div>
      <div>
        <span className="section-kicker">STANDALONE PROJECT / FICTIONAL SCENARIOS</span>
        <h3>Technical presales solution workbench</h3>
        <p>Shape a discovery brief, compare architecture trade-offs and export an editable proposal with costs, assumptions and a measurable PoC plan.</p>
        <span className="knowledge-card-meta"><ClipboardCheck size={14} /> presales.bestdev.co.il · Public demo & source</span>
      </div>
      <ArrowUpRight size={23} className="knowledge-card-arrow" />
    </a>
  );
}
