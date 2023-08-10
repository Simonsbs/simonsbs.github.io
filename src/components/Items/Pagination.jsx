import React from "react";
import "./Pagination.css";

function Pagination({ itemsPerPage, totalItems, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination justify-content-center">
      <ul>
        {currentPage === 1 ? null : (
          <li>
            <a
              onClick={(e) => {
                e.preventDefault();
                paginate(currentPage - 1);
              }}
              href={`#/blogs/page/${currentPage - 1}`}
            >
              <i className="icon-arrow-left"></i>
            </a>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={currentPage === number ? "is-active" : null}
          >
            <a onClick={() => paginate(number)} href={`#/blogs/page/${number}`}>
              {number}
            </a>
          </li>
        ))}
        {currentPage === pageNumbers[pageNumbers.length - 1] ? null : (
          <li>
            <a
              onClick={(e) => {
                e.preventDefault();
                paginate(currentPage + 1);
              }}
              href={`#/blogs/page/${currentPage + 1}`}
            >
              <i className="icon-arrow-right"></i>
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Pagination;
