import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import Pagination from 'components/Pagination';
import UsersTable from './components/UsersTable';
import ALL_USER from 'queries/allUser';

const UserList = ({ filter, onChangeFilter }) => {
  const { loading, error, data = {} } = useQuery(ALL_USER, {
    variables: {
      filter,
    },
  });
  if (error) cogoToast.error(setErrorMessage(error));
  const handleFilter = async e => {
    onChangeFilter({
      ...filter,
      offset: e.selected * filter.limit,
    });
  };

  const { allUser = {} } = data;
  const { totalCount = 0, results = [] } = allUser;
  const pageCount = Math.ceil(totalCount / filter.limit);
  return (
    <>
      <UsersTable loading={loading} data={results} filter={filter} />
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

export default UserList;
