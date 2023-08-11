import React from "react";
import { Link } from "react-router-dom";
import Blog from "../Items/Blog";
import { useBlogs } from "../../contexts/BlogContext";

function Blogs() {
  const blogsData = useBlogs();

  const recentBlogs = blogsData
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <>
      <div className="row">
        {recentBlogs.map((blog) => (
          <div className="col-md-4" key={blog.id}>
            <Blog blog={blog} />
          </div>
        ))}
      </div>
      <div className="spacer" data-height="50"></div>
      <div className="text-center">
        <Link to="/blog/" className="btn btn-default">
          Show All Blogs
        </Link>
      </div>
    </>
  );
}

export default Blogs;
