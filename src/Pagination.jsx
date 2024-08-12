import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 0; i < totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className="pagination">
        <button onClick={() => onPageChange(0)}>First Page</button>
        <button
          onClick={() => onPageChange(currentPage !== 0 ? currentPage - 1 : 0)}
        >
          Previous Page
        </button>
        {pageNumbers.map((number) => (
          <span
            key={number}
            style={{ color: "red" }}
            className={currentPage === number ? "active-page" : ""}
            onClick={() => onPageChange(number)}
          >
            {number + 1}
          </span>
        ))}
        <button
          onClick={() => onPageChange(currentPage !== 5 ? currentPage + 1 : 5)}
        >
          Next Page
        </button>
        <button onClick={() => onPageChange(5)}>Last Page</button>
      </div>
    </nav>
  );
};
export default Pagination;
