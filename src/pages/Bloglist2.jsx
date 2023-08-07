import React, { useState, useEffect } from "react";
import Layout2 from "../components/Layout/Layout2";
import Blog2 from "../components/Items/Blog2";
import Pagination from "../components/Items/Pagination";

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
  {
    id: 4,
    title: "The Truth About Design In 3 Minutes",
    category: "Thoughts",
    featureImage: "images/blog/1.jpg",
    date: "13 March, 2021",
    author: "Simon B.Stirling",
    slug: "the-truth-about-design",
  },
  {
    id: 5,
    title: "The Ugly Truth About Design",
    category: "Blog",
    featureImage: "images/blog/2.jpg",
    date: "13 March, 2021",
    author: "Simon B.Stirling",
    slug: "the-ugly-truth-about-design",
  },
  {
    id: 6,
    title: "How To Become Better With UI Design",
    category: "Thoughts",
    featureImage: "images/blog/3.jpg",
    date: "13 March, 2021",
    author: "Simon B.Stirling",
    slug: "how-to-become-better-with-ui-design",
  },
  {
    id: 7,
    title: "The Truth About Design In 3 Minutes",
    category: "Thoughts",
    featureImage: "images/blog/1.jpg",
    date: "13 March, 2021",
    author: "Simon B.Stirling",
    slug: "the-truth-about-design",
  },
  {
    id: 8,
    title: "The Ugly Truth About Design",
    category: "Blog",
    featureImage: "images/blog/2.jpg",
    date: "13 March, 2021",
    author: "Simon B.Stirling",
    slug: "the-ugly-truth-about-design",
  },
  {
    id: 9,
    title: "How To Become Better With UI Design",
    category: "Thoughts",
    featureImage: "images/blog/3.jpg",
    date: "13 March, 2021",
    author: "Simon B.Stirling",
    slug: "how-to-become-better-with-ui-design",
  },
];

function Bloglist2() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setPosts(blogsData);
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <Layout2>
      <section className="shadow-blue white-bg padding mt-0">
        <div className="row -mt-50">
          {currentPosts.map((blog) => (
            <div className="col-md-6 mt-50" key={blog.id}>
              <Blog2 blog={blog} />
            </div>
          ))}
        </div>
        <div className="spacer" data-height="50"></div>
        {!(posts.length > postsPerPage) ? null : (
          <Pagination
            itemsPerPage={postsPerPage}
            totalItems={posts.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        )}
      </section>
    </Layout2>
  );
}

export default Bloglist2;
