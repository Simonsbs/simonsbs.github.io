import { ArrowUpRight, GitBranch, ShieldCheck } from "lucide-react";

export default function WorkflowLabCard() {
  return (
    <a href="https://workflow.bestdev.co.il/" target="_blank" rel="noopener noreferrer" className="knowledge-lab-card">
      <div className="knowledge-card-icon"><GitBranch size={29} strokeWidth={1.4} /></div>
      <div>
        <span className="section-kicker">STANDALONE PROJECT / SYNTHETIC DATA</span>
        <h3>MCP integration & controlled workflow lab</h3>
        <p>Investigate synthetic integration errors through real MCP calls, inspect a proposed task and approve one scoped, replay-safe write.</p>
        <span className="knowledge-card-meta"><ShieldCheck size={14} /> workflow.bestdev.co.il · Public demo & source</span>
      </div>
      <ArrowUpRight size={23} className="knowledge-card-arrow" />
    </a>
  );
}
