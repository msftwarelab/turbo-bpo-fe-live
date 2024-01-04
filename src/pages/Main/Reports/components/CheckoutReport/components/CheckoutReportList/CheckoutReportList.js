import React from 'react';
import Pagination from 'components/Pagination';
import CheckoutReportTable from './components/CheckoutReportTable';

const CheckoutReportList = ({
  loading,
  filter,
  results,
  pageCount,
  handleFilter,
}) => {
  return (
    <>
      <CheckoutReportTable loading={loading} data={results} />
      {results && results.length ? (
        <Pagination
          pageCount={pageCount}
          onPageChange={handleFilter}
          currentPage={filter.offset / filter.limit}
        />
      ) : null}
    </>
  );
};

export default CheckoutReportList;
