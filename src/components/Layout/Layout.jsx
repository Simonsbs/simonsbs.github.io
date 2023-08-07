import React, { useState } from "react";
import Header from "./Header";

function Layout({ children }) {
  const [toggleHeader, setToggleHeader] = useState(false);
  const handleToggle = () => {
    setToggleHeader(!toggleHeader);
  };
  return (
    <div className="site-wrapper">
      <Header toggleHeader={toggleHeader} toggleHandler={handleToggle} />
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

export default Layout;
