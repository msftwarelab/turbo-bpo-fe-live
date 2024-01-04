import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import Pagination from 'components/Pagination';
import QualityControlsTable from './components/QualityControlsTable';
import { ALL_PIPELINE_QUALITY_CONTROL } from './queries';

const QualityControlList = ({ pipeline, filter, onChangeFilter }) => {
  const { loading, error, data = {} } = useQuery(ALL_PIPELINE_QUALITY_CONTROL, {
    variables: {
      pipelineId: pipeline.pipelineId,
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

  const { allPipelineQualityControl = {} } = data;
  const { totalCount = 0, results = [] } = allPipelineQualityControl;
  const pageCount = Math.ceil(totalCount / filter.limit);
  return (
    <>
      <QualityControlsTable loading={loading} data={results} />
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

export default QualityControlList;
