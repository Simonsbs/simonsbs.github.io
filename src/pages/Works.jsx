import React, { useEffect } from "react";
import Layout2 from "../components/Layout/Layout2";
import SectionHeading from "../components/Items/SectionHeading";
import Portfolios2 from "../components/Sections/Portfolios2";

function Works() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout2>
      <section className="shadow-blue white-bg padding mt-0">
        <SectionHeading title="Portfolio" />
        <Portfolios2 />
      </section>
    </Layout2>
  );
}

export default Works;
