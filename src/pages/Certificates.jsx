import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Helmet } from "react-helmet";
import "./Bloglist.css";

import { useCertificates } from "../contexts/CertificatesContext";
import Certificate from "../components/Items/Certificate";

function Certificates() {
  const data = useCertificates();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Simon B.Stilring - Certificates</title>
        <meta name="description" content="A list of my certificates." />
      </Helmet>
      <section className="shadow-blue white-bg padding mt-0">
        <h1 className="pb-2">A few of my Certificates</h1>
        <div className="row -mt-50">
          {data.map((certificate) => (
            <div className="col-md-6 mt-50 equal-height" key={certificate.id}>
              <Certificate certificate={certificate} />
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default Certificates;
