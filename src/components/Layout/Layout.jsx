import React, { useState } from "react";
import Header from "./Header";
import { useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";

function Layout({ children }) {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      scroll.scrollTo(hash);
    }
  }, []);

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
