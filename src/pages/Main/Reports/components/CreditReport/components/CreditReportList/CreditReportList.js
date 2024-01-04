import React from 'react';
import Pagination from 'components/Pagination';
import CreditReportTable from './components/CreditReportTable';

const CreditReportList = ({
  loading,
  filter,
  results,
  pageCount,
  handleFilter,
}) => {
  return (
    <>
      <CreditReportTable loading={loading} data={results} />
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

export default CreditReportList;
