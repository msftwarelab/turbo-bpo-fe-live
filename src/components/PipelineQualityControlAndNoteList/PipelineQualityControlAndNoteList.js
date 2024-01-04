import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import { shape, func } from 'prop-types';
import setErrorMessage from 'utils/setErrorMessage';
import Pagination from 'components/Pagination';
import ALL_PIPELINE_QUALITY_CONTROL_AND_NOTE from 'queries/allPipelineQualityControlAndNote';
import QualityControlAndNotesTable from './components/QualityControlAndNotesTable';

const PipelineQualityControlAndNoteList = ({
  pipeline,
  filter,
  onChangeFilter,
}) => {
  const { loading, error, data = {} } = useQuery(
    ALL_PIPELINE_QUALITY_CONTROL_AND_NOTE,
    {
      variables: {
        pipelineId: pipeline.id,
        filter,
      },
    }
  );

  if (error) cogoToast.error(setErrorMessage(error));
  const handleFilter = e => {
    onChangeFilter({
      ...filter,
      offset: e.selected * filter.limit,
    });
  };

  const { allPipelineQualityControlAndNote = {} } = data;
  const { totalCount = 0, results = [] } = allPipelineQualityControlAndNote;
  const pageCount = Math.ceil(totalCount / filter.limit);

  return (
    <>
      <QualityControlAndNotesTable loading={loading} data={results} />
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

PipelineQualityControlAndNoteList.propTypes = {
  pipeline: shape({}),
  filter: shape({}),
  onChangeFilter: func,
};

PipelineQualityControlAndNoteList.defaultProps = {
  pipeline: {},
  filter: {},
  onChangeFilter: e => e,
};

export default PipelineQualityControlAndNoteList;
