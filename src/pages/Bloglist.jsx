import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import Blog from "../components/Items/Blog";
import Pagination from "../components/Items/Pagination";
import { useBlogs } from "../contexts/BlogContext";

function Bloglist() {
  const blogsData = useBlogs();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogsData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <Layout>
      <section className="shadow-blue white-bg padding mt-0">
        <div className="row -mt-50">
          {currentPosts.map((blog) => (
            <div className="col-md-6 mt-50" key={blog.id}>
              <Blog blog={blog} />
            </div>
          ))}
        </div>
        <div className="spacer" data-height="50"></div>
        {!(blogsData.length > postsPerPage) ? null : (
          <Pagination
            itemsPerPage={postsPerPage}
            totalItems={blogsData.length} // Using blogsData directly
            paginate={paginate}
            currentPage={currentPage}
          />
        )}
      </section>
    </Layout>
  );
}

export default Bloglist;
