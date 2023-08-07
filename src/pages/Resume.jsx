import React, {useEffect} from "react";
import Layout2 from "../components/Layout/Layout2";
import SectionHeading from "../components/Items/SectionHeading";
import Experiences from "../components/Sections/Experiences";

function Resume() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout2>
      <section className="shadow-blue white-bg padding mt-0">
        <SectionHeading title="Experience" />
        <Experiences />
      </section>
    </Layout2>
  );
}

export default Resume;
