import React from "react";
import { Link } from "react-router-dom";
import Blog from "../Items/Blog";

const blogsData = [
  {
    id: 1,
    title: "The Truth About Design In 3 Minutes",
    category: "Thoughts",
    featureImage: "images/blog/1.jpg",
    date: "13 March, 2021",
    author: "Simon B.Stirling",
    slug: "the-truth-about-design",
  },
  {
    id: 2,
    title: "The Ugly Truth About Design",
    category: "Blog",
    featureImage: "images/blog/2.jpg",
    date: "13 March, 2021",
    author: "Simon B.Stirling",
    slug: "the-ugly-truth-about-design",
  },
  {
    id: 3,
    title: "How To Become Better With UI Design",
    category: "Thoughts",
    featureImage: "images/blog/3.jpg",
    date: "13 March, 2021",
    author: "Simon B.Stirling",
    slug: "how-to-become-better-with-ui-design",
  },
];

function Blogs() {
  return (
    <>
      <div className="row">
        {blogsData.map((blog) => (
          <div className="col-md-4" key={blog.id}>
            <Blog blog={blog} />
          </div>
        ))}
      </div>
      <div className="spacer" data-height="50"></div>
      <div className="text-center">
        <Link to="/blogs" className="btn btn-default">
          Show All Blogs
        </Link>
      </div>
    </>
  );
}

export default Blogs;
