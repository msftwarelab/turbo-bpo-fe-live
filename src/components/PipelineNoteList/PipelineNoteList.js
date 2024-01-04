import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import Pagination from 'components/Pagination';
import ALL_PIPELINE_NOTE from 'queries/allPipelineNote';
import { shape, func } from 'prop-types';
import NotesTable from './components/NotesTable';

const PipelineNoteList = ({ pipeline, filter, onChangeFilter }) => {
  const { loading, error, data = {} } = useQuery(ALL_PIPELINE_NOTE, {
    variables: {
      pipelineId: pipeline.id,
      filter,
    },
    fetchPolicy: 'network-only',
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

PipelineNoteList.propTypes = {
  pipeline: shape({}),
  filter: shape({}),
  onChangeFilter: func,
};

PipelineNoteList.defaultProps = {
  pipeline: {},
  filter: {},
  onChangeFilter: e => e,
};

export default PipelineNoteList;
