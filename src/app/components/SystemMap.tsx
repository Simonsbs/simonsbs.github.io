import {
  Code2,
  GraduationCap,
  Layers3,
  MoveUpRight,
  Users,
} from "lucide-react";
import { profile } from "../data/portfolio";

export default function SystemMap() {
  return (
    <div
      className="system-map"
      aria-label="Pre-sales discovery, enterprise solution design, implementation and post-sales support"
    >
      <div className="map-topline">
        <span>
          <i />
          THE CUSTOMER SOLUTION LIFECYCLE
        </span>
        <span>PRE-SALES / POST-SALES</span>
      </div>
      <svg
        className="map-connections"
        viewBox="0 0 480 390"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M240 190V93H121M240 190V93H359M240 190V302H121M240 190V302H359"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          className="map-path-accent"
          d="M121 93H240V190H359V302"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="240" cy="93" r="3" fill="currentColor" />
        <circle cx="240" cy="302" r="3" fill="currentColor" />
      </svg>
      <div className="map-node map-architecture">
        <Layers3 size={23} />
        <span>Discovery</span>
        <small>Customer needs & business value</small>
      </div>
      <div className="map-node map-engineering">
        <Code2 size={23} />
        <span>Architecture</span>
        <small>Feasible solutions & prototypes</small>
      </div>
      <div className="map-centre">
        <span className="map-centre-symbol">
          s<span>.</span>
        </span>
        <small>SOLUTIONS ARCHITECT</small>
      </div>
      <div className="map-node map-leadership">
        <Users size={23} />
        <span>Implementation</span>
        <small>Integration & customer delivery</small>
      </div>
      <div className="map-node map-mentoring">
        <GraduationCap size={23} />
        <span>Support & adoption</span>
        <small>Onboarding, training & reliability</small>
      </div>
      <div className="map-profile">
        <img
          src={profile.portrait}
          alt="Simon Stirling"
          width="42"
          height="42"
        />
        <div>
          <strong>Customer needs. Technical clarity.</strong>
          <span>Pre-sales, delivery & adoption.</span>
        </div>
        <MoveUpRight size={18} />
      </div>
    </div>
  );
}
