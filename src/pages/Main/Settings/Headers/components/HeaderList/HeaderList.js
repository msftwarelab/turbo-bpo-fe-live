import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import Pagination from 'components/Pagination';
import HeaderTable from './components/HeaderTable';
import { ALL_HEADER } from './queries';

const HeaderList = ({ filter, onChangeFilter }) => {
  const { loading, error, data = {} } = useQuery(ALL_HEADER, {
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

  const { allHeader = {} } = data;
  const { totalCount = 0, results = [] } = allHeader;
  const pageCount = Math.ceil(totalCount / filter.limit);
  return (
    <>
      <HeaderTable loading={loading} data={results} filter={filter} />
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

export default HeaderList;
