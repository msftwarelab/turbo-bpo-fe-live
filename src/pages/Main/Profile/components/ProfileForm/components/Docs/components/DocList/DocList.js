import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import setErrorMessage from 'utils/setErrorMessage';
import cogoToast from 'cogo-toast';
import Pagination from 'components/Pagination';
import DocsTable from './components/DocsTable';
import { ALL_PROFILE_DOC } from './queries';

const DocList = ({ filter, onChangeFilter }) => {
  const { loading, error, data = {} } = useQuery(ALL_PROFILE_DOC, {
    variables: { filter },
  });
  if (error) cogoToast.error(setErrorMessage(error));
  const handleFilter = async e => {
    onChangeFilter({
      ...filter,
      offset: e.selected * filter.limit,
    });
  };
  const { allProfileDoc = {} } = data;
  const { totalCount = 0, results = [] } = allProfileDoc;
  const pageCount = Math.ceil(totalCount / filter.limit);
  return (
    <>
      <DocsTable loading={loading} data={results} filter={filter} />
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

export default DocList;
