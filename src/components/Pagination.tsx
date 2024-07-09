import React from 'react';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const createPageButton = (pageNumber: number, isActive: boolean = false) => (
    <button
      key={pageNumber}
      className={`pagination__button ${isActive ? 'pagination__button_active' : ''}`}
      onClick={() => onPageChange(pageNumber)}
    >
      {pageNumber}
    </button>
  );

  const createEllipsis = () => (
    <span key="ellipsis" className="pagination__ellipsis">
      ...
    </span>
  );

  const buttons = [];
  if (currentPage > 1) {
    buttons.push(
      <button
        key="prev"
        className="pagination__button pagination__button_prev"
        onClick={() => onPageChange(currentPage - 1)}
      >
        &larr;
      </button>
    );
  }

  if (currentPage > 4) {
    buttons.push(createPageButton(1, false));
    buttons.push(createEllipsis());
  }

  for (let i = Math.max(1, currentPage - 3); i <= Math.min(totalPages, currentPage + 3); i++) {
    buttons.push(createPageButton(i, i === currentPage));
  }

  if (currentPage < totalPages - 3) {
    buttons.push(createEllipsis());
    buttons.push(createPageButton(totalPages, false));
  }

  if (currentPage < totalPages) {
    buttons.push(
      <button
        key="next"
        className="pagination__button pagination__button_next"
        onClick={() => onPageChange(currentPage + 1)}
      >
        &rarr;
      </button>
    );
  }

  return <div className="pagination">{buttons}</div>;
};

export default Pagination;
