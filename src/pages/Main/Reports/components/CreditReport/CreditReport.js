import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import ALL_CREDIT from 'queries/allCredits';
import CreditReportFilter from './components/CreditReportFilter';
import CreditReportList from './components/CreditReportList';

const CreditReport = () => {
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
    dateFrom: null,
    dateTo: null,
  });

  const handleFilter = async e => {
    setFilter({
      ...filter,
      offset: e.selected * filter.limit,
    });
  };

  const onChangeDateFilter = dateRange => {
    setFilter({
      ...filter,
      ...dateRange,
    });
  };

  const { loading, error, data = {} } = useQuery(ALL_CREDIT, {
    variables: {
      filter,
    },
  });

  if (error) cogoToast.error(setErrorMessage(error));

  const { allCredits = {} } = data;
  const { totalCount = 0, results = [] } = allCredits;
  const pageCount = Math.ceil(totalCount / filter.limit);

  return (
    <>
      <CreditReportFilter onChangeDateFilter={onChangeDateFilter} />
      <CreditReportList
        filter={filter}
        loading={loading}
        results={results}
        pageCount={pageCount}
        handleFilter={handleFilter}
      />
    </>
  );
};

export default CreditReport;
