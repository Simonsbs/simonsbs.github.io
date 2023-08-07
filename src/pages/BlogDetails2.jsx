import React, { useState, useEffect } from "react";
import Markdown from "markdown-to-jsx";
import Disqus from "disqus-react";
import fm from "front-matter";
import Layout2 from "../components/Layout/Layout2";

function BlogDetails2(props) {
  const [meta, setMeta] = useState("");
  const [content, setContent] = useState("");
  const blogId = props.match.params.id;
  const blogFile = props.match.params.title;

  useEffect(() => {
    import(`../blogs/${blogFile}.md`)
      .then((res) => res.default)
      .then((res) => {
        fetch(res)
          .then((data) => data.text())
          .then((res) => {
            let result = fm(res);
            setMeta(result.attributes);
            setContent(result.body);
          });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, [blogFile]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const disqusShortname = "bako-1"; //found in your Disqus.com dashboard
  const disqusConfig = {
    url: "https://jthemes.net/themes/react/bako", //Homepage link of this site.
    identifier: blogId,
    title: blogFile,
  };

  // document.body.classList.add("dark");
  //Uncomment the above line if you use dark version

  return (
    <Layout2>
      <section className="shadow-blue white-bg padding mt-0">
        <ul className="list-inline portfolio-info mt-0">
          <li className="list-inline-item">
            <i className="icon-user"></i>
            {meta.author}
          </li>
          <li className="list-inline-item">
            <i className="icon-calendar"></i>
            {meta.date}
          </li>
          <li className="list-inline-item">
            <i className="icon-folder"></i>
            {meta.category}
          </li>
        </ul>
        <div className="blog-content mt-4">
          <Markdown children={content}></Markdown>
        </div>
        <div className="mi-blog-details-comments mt-4">
          <Disqus.DiscussionEmbed
            shortname={disqusShortname}
            config={disqusConfig}
          />
        </div>
      </section>
    </Layout2>
  );
}

export default BlogDetails2;
