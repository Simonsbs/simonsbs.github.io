import React, { useEffect } from "react";
import Layout2 from "../components/Layout/Layout2";
import Herosection from "../components/Sections/Herosection";

function Multipage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout2>
      <Herosection />
    </Layout2>
  );
}

export default Multipage;
