import React from "react";
import PillBoxes from "../Items/PillBoxes";
import SectionHeading from "../Items/SectionHeading";

function Skills({ children, title, skills }) {
  return (
    <>
      <SectionHeading title={title} />
      <p className="mb-0">{children}</p>
      <div className="mt-5">
        <PillBoxes items={skills} />
      </div>
    </>
  );
}

export default Skills;
