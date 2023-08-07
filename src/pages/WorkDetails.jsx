import React, { useState, useEffect } from "react";
import Markdown from "markdown-to-jsx";
import fm from "front-matter";
import Layout from "../components/Layout/Layout";

function WorkDetails(props) {
  const [meta, setMeta] = useState("");
  const [content, setContent] = useState("");
  const title = props.match.params.title;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    import(`../works/${title}.md`)
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
  }, [title]);

  return (
    <Layout>
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
            <a
              href={meta && meta.link}
              target="__blank"
              rel="noopener noreferrer"
            >
              <i className="icon-link"></i>
              {meta && meta.link}
            </a>
          </li>
        </ul>
        <Markdown children={content}></Markdown>
      </section>
    </Layout>
  );
}

export default WorkDetails;
