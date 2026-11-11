import {
  ArrowLeft,
  ArrowRight,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { articles } from "../data/portfolio";
import { ArticleCard, EmptyState, Eyebrow, PageMeta } from "../components/UI";

const topics = [...new Set(articles.map((article) => article.category))].sort();
const pageSize = 6;

export default function Journal() {
  const [params] = useSearchParams();
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const query = params.get("q") || "";
  const topic = params.get("topic") || "All topics";
  const sort = params.get("sort") || "newest";
  const matches = articles.filter(
    (article) =>
      (topic === "All topics" || article.category === topic) &&
      `${article.title} ${article.category} ${article.excerpt}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  if (sort === "oldest") matches.reverse();
  const totalPages = Math.ceil(matches.length / pageSize);
  const pageValue = Number(pageNumber || 1);
  const currentPage =
    Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;
  const page = matches.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  function updateFilter(name: string, value: string) {
    const next = new URLSearchParams(params);
    if (!value || value === "All topics" || value === "newest")
      next.delete(name);
    else next.set(name, value);
    navigate(
      { pathname: "/blog/", search: next.toString() ? `?${next}` : "" },
      { replace: true },
    );
  }
  function paginate(value: number) {
    navigate({
      pathname: value === 1 ? "/blog/" : `/blog/page/${value}`,
      search: params.toString() ? `?${params}` : "",
    });
  }

  return (
    <>
      <PageMeta
        title="The journal"
        description="Thoughts from Simon Stirling on software development, technology, leadership and building better teams."
      />
      <section className="page-intro shell">
        <Eyebrow>NOTES FROM THE INTERSECTION</Eyebrow>
        <h1>
          Always building.
          <br />
          <span>Always thinking.</span>
        </h1>
        <p>
          Notes on the craft of software, the people behind it, and the lessons
          that connect the two.
        </p>
      </section>
      <section
        className="shell collection-section"
        aria-label="Journal articles"
      >
        <div className="journal-toolbar">
          <div className="search-field">
            <Search size={18} />
            <input
              type="search"
              aria-label="Search journal articles"
              placeholder="Find a thought, a topic, an idea..."
              value={query}
              onChange={(event) => updateFilter("q", event.target.value)}
            />
            {query && (
              <button
                onClick={() => updateFilter("q", "")}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <div className="journal-selects">
            <label>
              <SlidersHorizontal size={16} />
              <span className="sr-only">Filter by topic</span>
              <select
                value={topic}
                onChange={(event) => updateFilter("topic", event.target.value)}
              >
                <option>All topics</option>
                {topics.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label>
              <span className="sr-only">Sort articles</span>
              <select
                value={sort}
                onChange={(event) => updateFilter("sort", event.target.value)}
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </label>
          </div>
        </div>
        <div className="journal-results" role="status">
          <span>
            {matches.length} {matches.length === 1 ? "article" : "articles"}
            {query && <> matching “{query}”</>}
          </span>
          {totalPages > 0 && (
            <span>
              Page {currentPage} of {totalPages}
            </span>
          )}
        </div>
        {page.length ? (
          <div className="articles-grid">
            {page.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={
              matches.length
                ? "That page is a little too far."
                : "No thoughts on that one. Yet."
            }
            onReset={() => navigate("/blog/", { replace: true })}
          >
            Try a different search or explore all the articles.
          </EmptyState>
        )}
        {totalPages > 1 && (
          <nav className="pagination" aria-label="Journal pages">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              <ArrowLeft size={16} />
              <span>Previous</span>
            </button>
            <div>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (number) => (
                  <button
                    key={number}
                    className={number === currentPage ? "selected" : ""}
                    aria-current={number === currentPage ? "page" : undefined}
                    aria-label={`Page ${number}`}
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </button>
                ),
              )}
            </div>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              <span>Next</span>
              <ArrowRight size={16} />
            </button>
          </nav>
        )}
      </section>
    </>
  );
}
