import { Helmet } from "react-helmet";
import Layout from "../components/Layout/Layout";
import { useEffect } from "react";

function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Simon B.Stilring - Terms and Policy</title>
        <meta
          name="description"
          content="Site and application terms and policies"
        />
      </Helmet>
      <section className="shadow-blue white-bg padding mt-0">
        <div className="container">
          <h1 className="mb-4">Terms and Policy</h1>

          <p>
            <strong>1. Acceptance of Terms</strong>
          </p>
          <p>
            By using bestdev.co.il and its associated applications, you agree to
            abide by these Terms of Usage. If you disagree with any part of the
            terms, please refrain from using our site and services.
          </p>

          <p>
            <strong>2. General Usage</strong>
          </p>
          <p>
            Users are expected to engage in general good usage practices and
            avoid misconduct.
          </p>

          <p>
            <strong>3. User Responsibilities</strong>
          </p>
          <p>
            Users are responsible for maintaining the confidentiality of their
            account details. Users can modify their own settings but are
            responsible for any changes made.
          </p>

          <p>
            <strong>4. Dispute Resolution</strong>
          </p>
          <p>
            In the event of any disputes between you and bestdev.co.il,
            resolution methods will be determined based on the specific issue.
          </p>

          <p>
            <strong>5. Limitation of Liability</strong>
          </p>
          <p>
            bestdev.co.il is provided "as-is". We shall not be liable for any
            damages, service outages, or issues arising from the use of our site
            or applications.
          </p>

          <p>
            <strong>6. Termination</strong>
          </p>
          <p>
            We reserve the right to terminate or suspend access without prior
            notice. Affected users will be informed via email but are not
            required to respond.
          </p>

          <p>
            <strong>7. Content Ownership</strong>
          </p>
          <p>
            All rights to the content uploaded or provided on bestdev.co.il are
            reserved by us. Unauthorized use or reproduction is prohibited.
          </p>

          <p>
            <strong>8. Payments</strong>
          </p>
          <p>
            For paid features or services, payments are primarily processed via
            third-party payment services. It's the user's responsibility to
            review the terms of these third-party services.
          </p>

          <p>
            <strong>9. Third-party Links</strong>
          </p>
          <p>
            Our site and applications may contain links to third-party sites or
            services. We are not responsible for the content, practices, or
            policies of these third parties.
          </p>

          <p>
            <strong>10. Modification of Terms</strong>
          </p>
          <p>
            These terms may be updated or changed. Any modifications will be
            communicated to users via email.
          </p>

          <p>
            <strong>11. Contact</strong>
          </p>
          <p>
            For any concerns or queries related to these terms, contact us at
            info@bestdev.co.il.
          </p>
        </div>
      </section>
    </Layout>
  );
}

export default Terms;
