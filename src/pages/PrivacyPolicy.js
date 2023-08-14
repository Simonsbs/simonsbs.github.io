import { Helmet } from "react-helmet";
import Layout from "../components/Layout/Layout";
import { useEffect } from "react";

function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Simon B.Stirling - Privacy Policy</title>
        <meta
          name="description"
          content="Site and application privacy policy"
        />
      </Helmet>
      <section className="shadow-blue white-bg padding mt-0">
        <div className="container">
          <h1 className="mb-4">Privacy Policy</h1>
          <p>
            <strong>Last Updated:</strong> 01/08/2023
          </p>
          <p>
            <strong>1. Introduction</strong>
          </p>
          <p>
            Welcome to bestdev.co.il. This privacy policy outlines our
            commitment to protecting and respecting your privacy.
          </p>

          <p>
            <strong>2. Data We Collect</strong>
          </p>
          <p>
            We may collect the following information: Name, Email address, IP
            address, and Usage data. Note: We may update the type of information
            we collect in the future.
          </p>

          <p>
            <strong>3. Purpose of Data Collection</strong>
          </p>
          <p>
            The data is collected for: Account creation, Provision of general
            services, Marketing, and other purposes that may be added in the
            future.
          </p>

          <p>
            <strong>4. Sharing of Data</strong>
          </p>
          <p>
            We may share your data with third-party services and partners,
            including but not limited to third-party logins and service
            providers like Google services. The list of third-party services may
            expand in the future.
          </p>

          <p>
            <strong>5. Data Storage</strong>
          </p>
          <p>
            Your sensitive data, such as passwords, is encrypted. We do not
            store credit card information.
          </p>

          <p>
            <strong>6. Data Retention</strong>
          </p>
          <p>
            Your data is retained until you delete your profile or request its
            deletion.
          </p>

          <p>
            <strong>7. Cookies and Trackers</strong>
          </p>
          <p>
            We use cookies for activity tracking and advertisements. This may
            change in the future.
          </p>

          <p>
            <strong>8. Children's Privacy</strong>
          </p>
          <p>
            Our site and services are not designed for children, and we do not
            intentionally collect data from them.
          </p>

          <p>
            <strong>9. User Rights</strong>
          </p>
          <p>
            You have the right to: Access your data, Modify your data, and
            Delete your data.
          </p>

          <p>
            <strong>10. Updates to This Policy</strong>
          </p>
          <p>
            Any changes to this privacy policy will be communicated via email.
          </p>

          <p>
            <strong>11. Contact</strong>
          </p>
          <p>
            For any concerns or queries related to privacy, you can contact us
            at info@bestdev.co.il.
          </p>

          <p>
            <strong>12. Third-party Integrations</strong>
          </p>
          <p>
            We may have integrations or plugins that collect data. Users are
            advised to review the privacy policies of third-party integrations.
          </p>

          <p>
            <strong>13. Data Transfers</strong>
          </p>
          <p>
            All data transfers are carried out securely over SSL or are
            protected by cloud services.
          </p>

          <p>
            <strong>14. Consent</strong>
          </p>
          <p>
            Users provide consent for data collection via a checkbox during
            signup.
          </p>
        </div>
      </section>
    </Layout>
  );
}

export default PrivacyPolicy;
