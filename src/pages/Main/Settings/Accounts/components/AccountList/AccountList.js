import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import Pagination from 'components/Pagination';
import AccountsTable from './components/AccountsTable';
import { ALL_ACCOUNT } from './queries';

const AccountList = ({ filter, onChangeFilter }) => {
  const { loading, error, data = {} } = useQuery(ALL_ACCOUNT, {
    variables: { filter },
  });
  if (error) cogoToast.error(setErrorMessage(error));
  const handleFilter = async e => {
    onChangeFilter({
      ...filter,
      offset: e.selected * filter.limit,
    });
  };

  const { allAccount = {} } = data;
  const { totalCount = 0, results = [] } = allAccount;
  const pageCount = Math.ceil(totalCount / filter.limit);
  return (
    <>
      <AccountsTable loading={loading} data={results} filter={filter} />
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

export default AccountList;
