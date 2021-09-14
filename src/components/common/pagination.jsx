import React from "react";
import _ from "lodash";
import propTypes from "prop-types";
const Pagination = (props) => {
  const { pageSize, itemCount, currentPage, onPageChange } = props;

  const pageCount = Math.ceil(itemCount / pageSize);
  const pages = _.range(1, pageCount + 1);

  if (pageCount === 1) return null;

  return (
    <ul className="pagination mt-2">
      {pages.map((page) => (
        <li
          key={page}
          className={currentPage === page ? "page-item active" : "page-item"}
        >
          <button className="page-link" onClick={() => onPageChange(page)}>
            {page}
          </button>
        </li>
      ))}
    </ul>
  );
};

Pagination.propTypes = {
  pageSize: propTypes.number.isRequired,
  itemCount: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired,
};


export default Pagination;
