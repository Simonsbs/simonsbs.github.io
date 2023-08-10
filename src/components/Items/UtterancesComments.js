import React, { useEffect, useRef } from "react";

function UtterancesComments({ term }) {
  const ref = useRef();

  useEffect(() => {
    const script = document.createElement("script");

    if (!term) {
      return;
    }

    console.log(term);

    const config = {
      src: "https://utteranc.es/client.js",
      repo: "simonsbs/simonsbs.github.io",
      "issue-term": term,
      theme: "github-light",
      crossOrigin: "anonymous",
      defer: true,
    };

    Object.entries(config).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });

    // Remove any existing script elements
    while (ref.current.firstChild) {
      ref.current.removeChild(ref.current.firstChild);
    }

    setTimeout(() => {
      ref.current.appendChild(script);
    }, 300);
  }, [term]);

  return <div ref={ref} />;
}

export default UtterancesComments;
