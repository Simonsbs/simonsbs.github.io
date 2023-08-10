import React, { useEffect, useRef } from "react";

const UtterancesComments = ({ term }) => {
  const ref = useRef();

  useEffect(() => {
    const script = document.createElement("script");

    const config = {
      src: "https://utteranc.es/client.js",
      repo: "simonsbs/simonsbs.github.io",
      "issue-term": { term },
      theme: "github-light",
      crossOrigin: "anonymous",
      defer: true,
    };

    Object.entries(config).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });

    setTimeout(() => {
      ref.current.append(script);
    }, 300);
  }, []);

  return <div ref={ref} />;
};

export default UtterancesComments;
