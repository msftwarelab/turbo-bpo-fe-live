import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import ALL_CHECKOUT from 'queries/allCheckout';
import CheckoutReportFilter from './components/CheckoutReportFilter';
import CheckoutReportList from './components/CheckoutReportList';

const CheckoutReport = () => {
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
    dateFrom: '',
    dateTo: '',
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

  const { loading, error, data = {} } = useQuery(ALL_CHECKOUT, {
    variables: {
      filter,
    },
  });

  if (error) cogoToast.error(setErrorMessage(error));

  const { allCheckout = {} } = data;
  const { totalCount = 0, results = [] } = allCheckout;
  const pageCount = Math.ceil(totalCount / filter.limit);

  return (
    <>
      <CheckoutReportFilter onChangeDateFilter={onChangeDateFilter} />
      <CheckoutReportList
        filter={filter}
        loading={loading}
        results={results}
        pageCount={pageCount}
        handleFilter={handleFilter}
      />
    </>
  );
};

export default CheckoutReport;
