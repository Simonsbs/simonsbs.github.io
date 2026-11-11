import { useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Copy,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import { profile } from "../data/portfolio";

type Recaptcha = {
  ready: (callback: () => void) => void;
  execute: (key: string, options: { action: string }) => Promise<string>;
};
declare global {
  interface Window {
    grecaptcha?: Recaptcha;
  }
}

let recaptchaPromise: Promise<Recaptcha> | undefined;
function loadRecaptcha(key: string) {
  if (window.grecaptcha) return Promise.resolve(window.grecaptcha);
  if (recaptchaPromise) return recaptchaPromise;
  recaptchaPromise = new Promise<Recaptcha>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(key)}`;
    script.async = true;
    const timeout = window.setTimeout(() => {
      script.remove();
      recaptchaPromise = undefined;
      reject(new Error("Verification timed out."));
    }, 15000);
    script.onload = () => {
      window.clearTimeout(timeout);
      if (window.grecaptcha) resolve(window.grecaptcha);
      else {
        script.remove();
        recaptchaPromise = undefined;
        reject(new Error("Verification could not load."));
      }
    };
    script.onerror = () => {
      window.clearTimeout(timeout);
      script.remove();
      recaptchaPromise = undefined;
      reject(new Error("Verification is unavailable."));
    };
    document.head.appendChild(script);
  });
  return recaptchaPromise;
}

export default function Contact() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return;
    if (status === "sending") return;
    setStatus("sending");
    try {
      const key =
        import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
        "6LeuFo4nAAAAAB2ILmBF5dmQMr2vgm6QAv4nqdiZ";
      const recaptcha = await loadRecaptcha(key);
      await new Promise<void>((resolve) => recaptcha.ready(resolve));
      const token = await recaptcha.execute(key, { action: "contact_form" });
      if (!token) throw new Error("Verification failed.");
      const emailjs = await import("@emailjs/browser");
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_lf0ynhs",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_lpolee3",
        {
          name: String(data.get("name")).trim(),
          email: String(data.get("email")).trim(),
          subject: String(data.get("subject")).trim(),
          message: String(data.get("message")).trim(),
          "g-recaptcha-response": token,
        },
        {
          publicKey:
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "us0gunYAFcwPMgsWj",
        },
      );
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setCopyError(false);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError(true);
    }
  }

  return (
    <div className="contact-grid">
      <div className="contact-copy">
        <div className="section-kicker">
          <span>06</span>LET’S CONNECT
        </div>
        <h2>
          Let’s discuss
          <br />
          your <span>next hire.</span>
        </h2>
        <p>
          I’m looking for full-time pre-sales, post-sales, enterprise
          architecture and solutions architect roles. If your team needs someone
          who can work with customers from technical discovery through
          implementation and ongoing support, get in touch.
        </p>
        <p className="contact-work-rights">
          {profile.workRights} {profile.relocation}
        </p>
        <div className="contact-email">
          <a href={`mailto:${profile.email}`}>
            {profile.email}
            <ArrowUpRight size={22} />
          </a>
          <button
            onClick={copyEmail}
            aria-label={copied ? "Email address copied" : "Copy email address"}
          >
            {copied ? <CheckCircle2 size={17} /> : <Copy size={17} />}
          </button>
        </div>
        <span className="copy-feedback" role="status">
          {copied
            ? "Email address copied."
            : copyError
              ? "You can use the email link to get in touch."
              : ""}
        </span>
        <div className="contact-details">
          <a href={`tel:${profile.phone}`}>
            <Phone size={16} />
            {profile.phone}
          </a>
          <span>
            <MapPin size={16} />
            {profile.location}
          </span>
        </div>
        <div className="contact-social">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin size={17} />
            LinkedIn
            <ArrowUpRight size={13} />
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            <Github size={17} />
            GitHub
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
      <form className="contact-form" onSubmit={onSubmit}>
        <div className="form-heading">
          <Mail size={18} />
          <span>Tell me about the opportunity</span>
        </div>
        <div className="form-row">
          <label htmlFor="contact-name">
            Your name
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              placeholder="Alex Smith"
              required
              maxLength={120}
              disabled={status === "sending"}
            />
          </label>
          <label htmlFor="contact-email">
            Email address
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="alex@company.com"
              required
              maxLength={254}
              disabled={status === "sending"}
            />
          </label>
        </div>
        <label htmlFor="contact-subject">
          What’s on your mind?
          <input
            id="contact-subject"
            name="subject"
            placeholder="Role title and company"
            required
            maxLength={200}
            disabled={status === "sending"}
          />
        </label>
        <label htmlFor="contact-message">
          Your message
          <textarea
            id="contact-message"
            name="message"
            placeholder="Tell me about the role, team and working arrangements."
            required
            rows={4}
            maxLength={5000}
            disabled={status === "sending"}
          />
        </label>
        <div className="honeypot" aria-hidden="true">
          <label>
            Leave this empty
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <div className="form-bottom">
          <span>Include the role, location and working model.</span>
          <button
            className="button button-primary"
            type="submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? (
              <>
                <LoaderCircle size={17} className="spin" />
                Sending...
              </>
            ) : (
              <>
                Send message
                <Send size={16} />
              </>
            )}
          </button>
        </div>
        <div aria-live="polite" aria-atomic="true">
          {status === "success" && (
            <p className="form-status form-success">
              <CheckCircle2 size={18} />
              Your message has been sent. Thank you for getting in touch.
            </p>
          )}
          {status === "error" && (
            <p className="form-status form-error">
              Your message couldn’t be sent. Your text is still here. Please try
              again or <a href={`mailto:${profile.email}`}>email me directly</a>
              .
            </p>
          )}
        </div>
        <p className="captcha-note">
          Protected by reCAPTCHA. Google’s{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms
          </a>{" "}
          apply.
        </p>
      </form>
    </div>
  );
}
