import { ArrowUpRight, FileSearch, FlaskConical } from "lucide-react";

export default function KnowledgeLabCard() {
  return <a href="https://knowledge.bestdev.co.il/" target="_blank" rel="noopener noreferrer" className="knowledge-lab-card">
    <div className="knowledge-card-icon"><FileSearch size={29} strokeWidth={1.4} /></div>
    <div><span className="section-kicker">STANDALONE PROJECT / SYNTHETIC DATA</span>
      <h3>Knowledge assistant & evaluation lab</h3><p>Ask a fictional company knowledge base, inspect cited evidence and compare retrieval settings against 40 labelled questions.</p>
      <span className="knowledge-card-meta"><FlaskConical size={14} /> knowledge.bestdev.co.il · Public demo & source</span></div>
    <ArrowUpRight size={23} className="knowledge-card-arrow" />
  </a>;
}
