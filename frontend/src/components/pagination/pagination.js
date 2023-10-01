import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
        </li>
        {pageNumbers.map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? 'active' : ''}`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
