import React from 'react';
import Pagination from 'components/Pagination';
import BalanceReportTable from './components/BalanceReportTable';

const BalanceReportList = ({
  loading,
  filter,
  results,
  handleFilter,
  pageCount,
}) => {
  return (
    <>
      <BalanceReportTable loading={loading} data={results} />
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

export default BalanceReportList;
