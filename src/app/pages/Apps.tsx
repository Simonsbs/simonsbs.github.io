import { Eyebrow, PageMeta } from "../components/UI";
import MobileAppCards from "../components/MobileAppCards";
import "../mobile-apps.css";

export default function Apps() {
  return (
    <>
      <PageMeta
        title="Mobile apps"
        description="Explore mobile apps by Simon Stirling, including Math For Maya: offline addition and subtraction practice for children, with no ads or accounts."
      />
      <section className="page-intro shell">
        <Eyebrow>MOBILE APPS</Eyebrow>
        <h1>
          Small apps.<br />
          <span>A clear purpose.</span>
        </h1>
        <div className="page-intro-bottom">
          <p>
            Apps I build to make everyday learning a little easier. Find the app,
            see how it works and get help when you need it.
          </p>
        </div>
      </section>
      <section
        className="shell collection-section"
        aria-labelledby="mobile-apps-heading"
      >
        <div className="delivery-heading">
          <h2 id="mobile-apps-heading">Built for learning.</h2>
          <p>
            Math For Maya brings patient, guided maths practice to phones and tablets.
          </p>
        </div>
        <MobileAppCards />
      </section>
    </>
  );
}
