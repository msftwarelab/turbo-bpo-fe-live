import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import Pagination from 'components/Pagination';
import Teamstable from './components/TeamsTable';
import { ALL_USER } from './queries';

const TeamList = ({ userRoles: roles, topFilter, hideOrders }) => {
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
    ...topFilter,
    roles,
  });

  const handleFilter = async e => {
    setFilter({
      ...filter,
      offset: e.selected * filter.limit,
    });
  };

  const { loading, error, data = {} } = useQuery(ALL_USER, {
    variables: {
      filter,
    },
  });

  useEffect(() => {
    const { orderMonth, orderYear } = topFilter;

    setFilter({
      ...filter,
      orderMonth,
      orderYear,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topFilter]);

  if (error) cogoToast.error(setErrorMessage(error));

  const { allUser = {} } = data;
  const { totalCount = 0, results = [] } = allUser;
  const pageCount = Math.ceil(totalCount / filter.limit);

  return (
    <>
      <Teamstable loading={loading} data={results} hideOrders={hideOrders} />
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

export default TeamList;
