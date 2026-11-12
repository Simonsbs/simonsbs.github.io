import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clock3,
  MessageSquare,
} from "lucide-react";
import { Linkedin } from "../components/BrandIcons";
import { Link, useParams } from "react-router-dom";
import { articlePath, articles, formatDate, profile } from "../data/portfolio";
import { ArticleCard, CopyLink, PageMeta } from "../components/UI";
import { siteOrigin } from "../seo";

const articleFiles = import.meta.glob("/public/blogs/*.html", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function articleBody(html: string, title: string) {
  let body = (html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html)
    .replaceAll("https://bestdev.co.il/#/", "https://bestdev.co.il/")
    .replace(/href=(["'])\/#\//g, "href=$1/");
  body = body.replace(/^\uFEFF/, "");
  const firstHeading = body.match(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/i);
  if (
    firstHeading &&
    firstHeading[2]
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim() === title
  )
    body = body.replace(firstHeading[0], "");
  const levels = [...body.matchAll(/<h([1-6])\b/gi)].map((match) =>
    Number(match[1]),
  );
  const firstLevel = Math.min(...levels);
  return body.replace(
    /<(\/?)(h)([1-6])\b/gi,
    (_, closing, tag, level) =>
      `<${closing}${tag}${Math.min(6, Number(level) - firstLevel + 2)}`,
  );
}

function Comments({ term }: { term: string }) {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", "simonsbs/simonsbs.github.io");
    script.setAttribute("issue-term", term);
    script.setAttribute("theme", "github-dark");
    script.crossOrigin = "anonymous";
    script.async = true;
    const target = container.current;
    target?.appendChild(script);
    return () => {
      target?.replaceChildren();
    };
  }, [term]);
  return <div ref={container} className="comments-container" />;
}

export default function Article() {
  const { id } = useParams();
  const article = articles.find((item) => String(item.id) === id);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (!article) return;
    setShowComments(false);
    setCopied(false);
    setCopyError(false);
  }, [article]);

  if (!article)
    return (
      <section className="shell not-found">
        <PageMeta
          title="Article not found"
          description="Explore the journal for more articles on technology and leadership."
          noindex
        />
        <span className="section-kicker">A MISSING PAGE IN THE NOTEBOOK</span>
        <h1>
          That thought
          <br />
          isn’t here.
        </h1>
        <p>
          This article couldn’t be found. You can explore the rest of the
          journal below.
        </p>
        <Link className="button button-primary" to="/blog/">
          <ArrowLeft size={17} />
          Back to the journal
        </Link>
      </section>
    );

  async function copyUrl() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setCopyError(false);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError(true);
    }
  }

  const related = articles
    .filter((item) => item.id !== article.id)
    .sort(
      (a, b) =>
        Number(b.category === article.category) -
        Number(a.category === article.category),
    )
    .slice(0, 3);
  const articleIndex = articles.findIndex((item) => item.id === article.id);
  const previous = articles[articleIndex - 1];
  const next = articles[articleIndex + 1];

  return (
    <>
      <PageMeta title={article.title} description={article.excerpt} />
      <section className="article-header shell">
        <Link className="text-link" to="/blog/">
          <ArrowLeft size={16} />
          Back to the journal
        </Link>
        <div className="article-heading-meta">
          <span>{article.category}</span>
          <span>
            <Clock3 size={14} />
            {article.readingMinutes} min read
          </span>
        </div>
        <h1>{article.title}</h1>
        <div className="article-byline">
          <img src={profile.portrait} alt="" width="38" height="38" />
          <div>
            <strong>{article.author}</strong>
            <time dateTime={new Date(article.date).toISOString().slice(0, 10)}>
              {formatDate(article.date)}
            </time>
          </div>
        </div>
      </section>
      <div className="article-cover shell">
        <img src={article.featureImage} alt="" width="1200" height="620" />
      </div>
      <div className="article-body-wrap shell">
        <aside className="article-aside">
          <span>A NOTE ON</span>
          <strong>{article.category}</strong>
          <span className="aside-rule" />
          <p>
            Ideas to take with you.
            <br />
            Questions to come back to.
          </p>
        </aside>
        <div className="article-body">
          <article
            className="prose"
            dangerouslySetInnerHTML={{
              __html: articleBody(
                articleFiles[`/public/blogs/${article.content}`],
                article.title,
              ),
            }}
          />
          <div className="article-share">
            <div>
              <span>Worth sharing?</span>
              <p>Pass the thought along.</p>
            </div>
            <div>
              <CopyLink copied={copied} onClick={copyUrl} />
              <a
                className="icon-button"
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteOrigin + articlePath(article))}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share article on LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          {copyError && (
            <p role="status">
              The link couldn’t be copied. You can copy it from your address
              bar.
            </p>
          )}
          <div className="article-navigation">
            {previous ? (
              <Link to={articlePath(previous)}>
                <span>
                  <ArrowLeft size={14} />
                  Newer note
                </span>
                <strong>{previous.title}</strong>
              </Link>
            ) : (
              <div />
            )}
            {next && (
              <Link to={articlePath(next)}>
                <span>
                  Older note
                  <ArrowRight size={14} />
                </span>
                <strong>{next.title}</strong>
              </Link>
            )}
          </div>
          <div className="article-comments">
            <MessageSquare size={22} />
            <h2>Continue the conversation.</h2>
            <p>
              Comments are hosted on GitHub. Load the discussion to read or
              leave a comment.
            </p>
            {showComments ? (
              <Comments key={article.id} term={article.slug} />
            ) : (
              <button
                className="button button-secondary"
                onClick={() => setShowComments(true)}
              >
                Load discussion
                <ArrowUpRight size={17} />
              </button>
            )}
          </div>
        </div>
      </div>
      <section className="section shell related-section">
        <div className="section-heading">
          <h2>A few more thoughts.</h2>
          <Link className="text-link" to="/blog/">
            All articles
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="articles-grid">
          {related.map((item) => (
            <ArticleCard article={item} key={item.id} compact />
          ))}
        </div>
      </section>
    </>
  );
}
