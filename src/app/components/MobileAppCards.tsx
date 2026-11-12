import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import apps from "../data/mobile-apps.json";

export default function MobileAppCards() {
  return (
    <div className="mobile-app-list">
      {apps.map((app) => (
        <article className="mobile-app-card" key={app.id}>
          <a
            className="mobile-app-preview"
            href={app.path}
            aria-label={`Explore ${app.name}`}
          >
            <img
              src={app.screenshot}
              alt={`${app.name} showing a colourful column addition exercise`}
              width="1080"
              height="1920"
              loading="lazy"
            />
          </a>
          <div className="mobile-app-details">
            <div className="mobile-app-identity">
              <img src={app.icon} alt="" width="56" height="56" loading="lazy" />
              <div>
                <span className="section-kicker">
                  {app.platform} / {app.audience}
                </span>
                <h3><a href={app.path}>{app.name}</a></h3>
              </div>
            </div>
            <p>{app.description}</p>
            <ul className="mobile-app-features" aria-label={`${app.name} features`}>
              {app.features.map((feature) => (
                <li key={feature}>
                  <Check size={15} aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mobile-app-actions">
              {/* These are independent static pages, so use full-document links. */}
              <a className="button button-primary" href={app.path}>
                Explore the app<ArrowRight size={17} />
              </a>
              <a
                className="text-link"
                href={app.playStore}
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Play<ArrowUpRight size={17} />
              </a>
            </div>
            <div className="mobile-app-help">
              <a href={`${app.path}privacy/`}>Privacy policy</a>
              <a href={`${app.path}support/`}>App support</a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
