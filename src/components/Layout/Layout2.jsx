import React, { useState } from "react";
import Header2 from "./Header2";

function Layout2({ children }) {
  const [toggleHeader, setToggleHeader] = useState(false);
  const handleToggle = () => {
    setToggleHeader(!toggleHeader);
  };
  return (
    <div className="site-wrapper">
      <Header2 toggleHeader={toggleHeader} toggleHandler={handleToggle} />
      <main
        className={
          toggleHeader ? "content float-end push" : "content float-end"
        }
      >
        {children}
      </main>
    </div>
  );
}

export default Layout2;
