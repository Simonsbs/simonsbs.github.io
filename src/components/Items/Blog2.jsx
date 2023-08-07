import React from "react";
import { Link } from "react-router-dom";

function Blog({
  blog: { id, title, category, featureImage, date, author, slug },
}) {
  return (
    <div className="blog-item">
      <div className="thumb">
        <a href="#!">
          <span className="category">{category}</span>
        </a>
        <Link to={`blog-details/${id}/${slug}`}>
          <img src={featureImage} alt={title} />
        </Link>
      </div>
      <h4 className="mt-4 mb-0">
        <Link to={`blog-details/${id}/${slug}`}>{title}</Link>
      </h4>
      <ul className="list-inline meta mb-0 mt-3">
        <li className="list-inline-item">{date}</li>
        <li className="list-inline-item">{author}</li>
      </ul>
    </div>
  );
}

export default Blog;
