import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import BalanceReportList from './components/BalanceReportList';
import ALL_BALANCE from 'queries/allBalance';

const BalanceReport = () => {
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
    clientName: null,
  });

  const handleFilter = e => {
    setFilter({
      ...filter,
      offset: e.selected * filter.limit,
    });
  };

  const handleOnChange = e => {
    let { name, value } = e.target;

    value = value.replace(/\s/g, '');

    setFilter({
      ...filter,
      [name]: value ? value : null,
    });
  };

  const { loading, error, data = {} } = useQuery(ALL_BALANCE, {
    variables: {
      filter,
    },
  });

  if (error) cogoToast.error(setErrorMessage(error));

  const { allBalance = {} } = data;
  const { totalCount = 0, results = [] } = allBalance;
  const pageCount = Math.ceil(totalCount / filter.limit);

  return (
    <>
      <div className="col-12 d-flex mb-3">
        <input
          type="text"
          placeholder="Client name"
          name="clientName"
          className="form-control form-control-sm col-2"
          onChange={handleOnChange}
        />
      </div>
      <BalanceReportList
        filter={filter}
        loading={loading}
        results={results}
        handleFilter={handleFilter}
        pageCount={pageCount}
      />
    </>
  );
};

export default BalanceReport;
