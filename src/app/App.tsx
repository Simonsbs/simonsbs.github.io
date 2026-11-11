import { lazy, Suspense } from "react";
import { HashRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { PageMeta } from "./components/UI";

const Work = lazy(() => import("./pages/Work"));
const Journal = lazy(() => import("./pages/Journal"));
const Article = lazy(() => import("./pages/Article"));
const Certificates = lazy(() => import("./pages/Certificates"));
const Legal = lazy(() => import("./pages/Legal"));
const Project = lazy(() => import("./pages/Project"));

function NotFound() {
  return (
    <section className="shell not-found">
      <PageMeta
        title="Page not found"
        description="Find your way back to Simon Stirling’s portfolio."
      />
      <span className="section-kicker">404 / A small detour</span>
      <h1>
        This page took
        <br />a different path.
      </h1>
      <p>
        The page you’re looking for isn’t here. There’s plenty to explore back
        at the beginning.
      </p>
      <Link to="/" className="button button-primary">
        <ArrowLeft size={18} />
        Back to the overview
      </Link>
    </section>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="page-loading" role="status">
            <span className="loading-dot" />
            Loading the next page...
          </div>
        }
      >
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            {[
              "about",
              "services",
              "resume",
              "contact",
              "blogpreview",
              "work",
            ].map((section) => (
              <Route key={section} path={section} element={<Home />} />
            ))}
            <Route path="projects" element={<Work />} />
            <Route path="projects/:projectId" element={<Project />} />
            <Route
              path="labs/knowledge"
              element={<Navigate to="/projects/knowledge-lab" replace />}
            />
            <Route path="blog" element={<Journal />} />
            <Route path="blog/page/:pageNumber" element={<Journal />} />
            <Route path="blog/:id/:slug" element={<Article />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="privacy" element={<Legal kind="privacy" />} />
            <Route path="terms" element={<Legal kind="terms" />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
}
