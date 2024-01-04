import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import Pagination from 'components/Pagination';
import ALL_PIPELINE_DOC from 'queries/allPipelineDoc';
import DocsTable from './components/DocsTable';

const PipelineDocList = ({
  selectedDocs = [],
  onSelectedDocs = e => e,
  pipeline = {},
  filter,
  pipelineFilter,
  onChangeFilter,
}) => {
  const { loading, error, data = {} } = useQuery(ALL_PIPELINE_DOC, {
    variables: {
      pipelineId: pipeline.id,
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

  const handleSelectedDoc = e => {
    let newSelectedDocs = [...selectedDocs, e];
    if (selectedDocs.map(item => item.id).includes(e.id)) {
      newSelectedDocs = selectedDocs.filter(item => item.id !== e.id);
    }
    onSelectedDocs(newSelectedDocs);
  };

  const handleAllSelectedDocs = () => {
    let newSelectedDocs = results;
    if (
      results.some(item =>
        selectedDocs.map(selected => selected.id).includes(item.id)
      )
    ) {
      newSelectedDocs = [];
    }
    onSelectedDocs(newSelectedDocs);
  };

  const { allPipelineDoc = {} } = data;
  const { totalCount = 0, results } = allPipelineDoc;
  const pageCount = Math.ceil(totalCount / filter.limit);
  return (
    <>
      <DocsTable
        selectedDocs={selectedDocs}
        onSelectDoc={handleSelectedDoc}
        onAllSelectedDocs={handleAllSelectedDocs}
        loading={loading}
        data={results}
        pipelineId={pipeline.id}
        filter={filter}
        pipelineFilter={pipelineFilter}
      />
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

export default PipelineDocList;
