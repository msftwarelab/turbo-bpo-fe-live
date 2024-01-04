import React from 'react';
import ReactPaginate from 'react-paginate';
import { number, func, string } from 'prop-types';

const Pagination = ({
  viewType,
  pageCount,
  currentPage,
  limit,
  totalCount,
  onPageChange,
  className,
}) => {
  const displaying = (currentPage + 1) * limit;
  return (
    <div className="d-flex justify-content-end">
      <ReactPaginate
        containerClassName={`pagination mb-0 justify-content-end ${className}`}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-link"
        nextClassName="page-link"
        activeClassName="active"
        disabledClassName="disabled"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={pageCount}
        forcePage={currentPage}
        onPageChange={onPageChange}
        marginPagesDisplayed={2}
        pageRangeDisplayed={1}
      />
      {viewType === 'ROW' && (
        <div className="ml-2 p-2">
          Displaying 1-{displaying > totalCount ? totalCount : displaying} /{' '}
          {totalCount}
        </div>
      )}
      {viewType === 'PAGE' && (
        <div className="ml-2 p-2">
          {currentPage + 1} / {pageCount}
        </div>
      )}
    </div>
  );
};

Pagination.propTypes = {
  viewType: string,
  limit: number,
  totalCount: number,
  pageCount: number,
  onPageChange: func,
  className: string,
  currentPage: number,
};

Pagination.defaultProps = {
  viewType: 'PAGE',
  totalCount: 1,
  limit: 1,
  pageCount: 0,
  onPageChange: e => e,
  className: '',
  currentPage: 1,
};

export default Pagination;
