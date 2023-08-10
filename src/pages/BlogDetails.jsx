import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Layout from "../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useBlogs } from "../contexts/BlogContext";
import Helmet from "react-helmet";
import UtterancesComments from "../components/Items/UtterancesComments";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";

function BlogDetails() {
  const blogs = useBlogs();
  const { id } = useParams();

  const blogIndex = blogs.findIndex((b) => b.id.toString() === id);
  const blog = blogs[blogIndex] || {};

  const [content, setContent] = useState("");
  const nav = useNavigate();

  const shareUrl = window.location.href;

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!blog.content) {
      return;
    }

    fetch(`./blogs/${blog.content}`)
      .then((response) => response.text())
      .then((htmlContent) => setContent(htmlContent))
      .catch((error) => console.error("Error fetching content:", error));
  }, [blog.content]);

  const navigateToPost = (direction) => {
    const newIndex = direction === "next" ? blogIndex + 1 : blogIndex - 1;
    if (newIndex >= 0 && newIndex < blogs.length) {
      nav(`/blogs/${blogs[newIndex].id}/${blogs[newIndex].slug}`);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Simon B.Stilring - Blog - {"" + blog.title}</title>
        <meta name="description" content={"" + blog.title} />
      </Helmet>
      <div className="mb-4 d-flex justify-content-between">
        {blogIndex > 0 ? (
          <button
            className="btn btn-primary me-3"
            onClick={() => navigateToPost("prev")}
          >
            ← Previous
          </button>
        ) : (
          <div style={{ flex: 1 }}></div>
        )}
        {blogIndex < blogs.length - 1 && (
          <button
            className="btn btn-primary"
            onClick={() => navigateToPost("next")}
          >
            Next →
          </button>
        )}
      </div>

      <section className="shadow-blue white-bg padding mt-0">
        <ul className="list-inline portfolio-info mt-0">
          <li className="list-inline-item">
            <i className="icon-user" aria-hidden="true"></i>
            <span className="sr-only">Author:</span>
            {blog.author}
          </li>
          <li className="list-inline-item">
            <i className="icon-calendar" aria-hidden="true"></i>
            <span className="sr-only">Date:</span>
            {blog.date}
          </li>
          <li className="list-inline-item">
            <i className="icon-folder" aria-hidden="true"></i>
            <span className="sr-only">Category:</span>
            {blog.category}
          </li>
        </ul>
        <article
          className="blog-content mt-4"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="share-buttons mt-4">
          <FacebookShareButton url={shareUrl} quote={blog.title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <TwitterShareButton url={shareUrl} title={blog.title}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>

          <LinkedinShareButton url={shareUrl}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </div>
        <div className="mi-blog-details-comments mt-4">
          <UtterancesComments term={blog.slug} />
        </div>
      </section>
      <div className="mt-4 d-flex justify-content-between">
        {blogIndex > 0 ? (
          <button
            className="btn btn-primary me-3"
            onClick={() => navigateToPost("prev")}
          >
            ← Previous
          </button>
        ) : (
          <div style={{ flex: 1 }}></div>
        )}
        {blogIndex < blogs.length - 1 && (
          <button
            className="btn btn-primary"
            onClick={() => navigateToPost("next")}
          >
            Next →
          </button>
        )}
      </div>
    </Layout>
  );
}

BlogDetails.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      featureImage: PropTypes.string,
      date: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};

export default BlogDetails;
