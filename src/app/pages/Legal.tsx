import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { PageMeta } from "../components/UI";
import privacy from "../data/privacy.html?raw";
import terms from "../data/terms.html?raw";

export default function Legal({ kind }: { kind: "privacy" | "terms" }) {
  return (
    <section className="shell legal-section">
      <PageMeta
        title={kind === "privacy" ? "Privacy policy" : "Terms of usage"}
        description={`The existing ${kind === "privacy" ? "privacy policy" : "terms of usage"} for bestdev.co.il.`}
      />
      <Link className="text-link" to="/">
        <ArrowLeft size={16} />
        Back to the overview
      </Link>
      <div
        className="prose legal-prose"
        dangerouslySetInnerHTML={{
          __html: kind === "privacy" ? privacy : terms,
        }}
      />
    </section>
  );
}
