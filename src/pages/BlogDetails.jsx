import React, { useEffect } from "react";
//import Disqus from "disqus-react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import { useBlogs } from "../contexts/BlogContext";

function BlogDetails() {
  const blogs = useBlogs();
  const { id } = useParams();
  const blog = blogs.find((b) => b.id.toString() === id) || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const disqusShortname = "bako-1";
  // const disqusConfig = {
  //   url: "https://jthemes.net/themes/react/bako",
  //   identifier: id,
  //   title: blog.title,
  // };

  return (
    <Layout>
      <section className="shadow-blue white-bg padding mt-0">
        <ul className="list-inline portfolio-info mt-0">
          <li className="list-inline-item">
            <i className="icon-user"></i>
            {blog.author}
          </li>
          <li className="list-inline-item">
            <i className="icon-calendar"></i>
            {blog.date}
          </li>
          <li className="list-inline-item">
            <i className="icon-folder"></i>
            {blog.category}
          </li>
        </ul>
        <div
          className="blog-content mt-4"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        {/* <div className="mi-blog-details-comments mt-4">
          <Disqus.DiscussionEmbed
            shortname={disqusShortname}
            config={disqusConfig}
          />
        </div> */}
      </section>
    </Layout>
  );
}

export default BlogDetails;
