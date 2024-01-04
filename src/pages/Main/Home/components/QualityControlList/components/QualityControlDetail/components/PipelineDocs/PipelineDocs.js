import React, { useState } from 'react';
import PipelineDocList from 'components/PipelineDocList';
import AddPipelineDoc from 'components/AddPipelineDoc';

const PipelineDocs = ({ pipeline }) => {
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
  });

  const handleFilter = e => setFilter(e);
  return (
    <div className="overflow-auto p-2">
      <div className="mb-3">
        <AddPipelineDoc pipeline={pipeline} filter={filter} />
      </div>
      <PipelineDocList
        pipeline={pipeline}
        filter={filter}
        onChangeFilter={handleFilter}
      />
    </div>
  );
};

export default PipelineDocs;
