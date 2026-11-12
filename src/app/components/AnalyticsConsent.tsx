import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { savedConsent, setAnalyticsConsent } from "../analytics";

export default function AnalyticsConsent() {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState<boolean | null>(null);
  const settings = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const consent = savedConsent();
    setChoice(consent);
    setOpen(consent === null);
    setAnalyticsConsent(consent === true, false);
  }, []);
  function choose(granted: boolean) {
    setAnalyticsConsent(granted);
    setChoice(granted);
    setOpen(false);
    settings.current?.focus({ preventScroll: true });
  }
  return (
    <>
      <button
        ref={settings}
        type="button"
        className="analytics-settings"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        Analytics settings
      </button>
      {open && (
        <section
          className="analytics-consent"
          role="dialog"
          aria-label="Analytics cookies"
          aria-describedby="analytics-description"
        >
          <div>
            <h2>Analytics cookies</h2>
            <p id="analytics-description">
              With your permission, Google Analytics measures page visits, CV
              downloads and demo clicks. It starts only if you allow it. You can
              change your choice here at any time.{" "}
              <Link to="/privacy/">Privacy policy</Link>
            </p>
            {choice !== null && (
              <p className="analytics-current">
                Currently {choice ? "allowed" : "rejected"}.
              </p>
            )}
          </div>
          <div className="analytics-actions">
            <button
              className="button button-secondary"
              type="button"
              onClick={() => choose(false)}
            >
              Reject analytics
            </button>
            <button
              className="button button-secondary"
              type="button"
              onClick={() => choose(true)}
            >
              Allow analytics
            </button>
            {choice !== null && (
              <button
                type="button"
                className="analytics-settings"
                onClick={() => setOpen(false)}
              >
                Close settings
              </button>
            )}
          </div>
        </section>
      )}
    </>
  );
}
