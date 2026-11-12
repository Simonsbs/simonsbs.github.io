import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/manrope";
import App from "./app/App";
import "./app/site.css";
import "./app/projects.css";
import "./app/refresh.css";

// Existing shared fragment links keep working after the move to real URLs.
const legacyRoute = window.location.hash.startsWith("#/");
if (legacyRoute)
  window.history.replaceState(null, "", window.location.hash.slice(1));
const root = document.getElementById("root")!;
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
if (root.hasChildNodes() && !legacyRoute) ReactDOM.hydrateRoot(root, app);
else ReactDOM.createRoot(root).render(app);
