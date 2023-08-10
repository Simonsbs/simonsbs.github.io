import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import { useBlogs } from "../contexts/BlogContext";
import Helmet from "react-helmet"; // For SEO
import UtterancesComments from "../components/Items/UtterancesComments";

function BlogDetails() {
  const blogs = useBlogs();
  const { id } = useParams();
  const blog = blogs.find((b) => b.id.toString() === id) || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>{blog.title}</title>
        <meta name="description" content={blog.title} />
      </Helmet>
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
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        <div className="mi-blog-details-comments mt-4">
          <UtterancesComments term={blog.slug} />
        </div>
      </section>
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
