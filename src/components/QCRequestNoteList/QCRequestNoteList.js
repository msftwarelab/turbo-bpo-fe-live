import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import Pagination from 'components/Pagination';
import NotesTable from './components/NotesTable';
import ALL_PIPELINE_NOTE from 'queries/allPipelineNote';

const QCRequestNoteList = ({ qcRequest, filter, onChangeFilter }) => {
  const { loading, error, data = {} } = useQuery(ALL_PIPELINE_NOTE, {
    variables: {
      pipelineId: qcRequest.pipelineId,
      filter,
    },
  });
  if (error) cogoToast.error(setErrorMessage(error));
  const handleFilter = e => {
    onChangeFilter({
      ...filter,
      offset: e.selected * filter.limit,
    });
  };

  const { allPipelineNote = {} } = data;
  const { totalCount = 0, results = [] } = allPipelineNote;
  const pageCount = Math.ceil(totalCount / filter.limit);
  return (
    <>
      <NotesTable loading={loading} data={results} />
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

export default QCRequestNoteList;
