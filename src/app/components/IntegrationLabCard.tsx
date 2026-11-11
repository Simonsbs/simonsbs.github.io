import { ArrowUpRight, GitBranch, FlaskConical } from "lucide-react";

export default function IntegrationLabCard() {
  return <a href="https://integration.bestdev.co.il/" target="_blank" rel="noopener noreferrer" className="knowledge-lab-card">
    <div className="knowledge-card-icon"><GitBranch size={29} strokeWidth={1.4} /></div>
    <div><span className="section-kicker">STANDALONE PROJECT / SYNTHETIC DATA</span>
      <h3>Integration & webhook reliability lab</h3><p>Send signed events, inject receiver outages and inspect retries, duplicate suppression and dead-letter recovery.</p>
      <span className="knowledge-card-meta"><FlaskConical size={14} /> integration.bestdev.co.il · Public demo & source</span></div>
    <ArrowUpRight size={23} className="knowledge-card-arrow" />
  </a>;
}
