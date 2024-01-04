import React, { useState } from 'react';
import IFormHistory from 'components/IFormHistory';
import IFormGeneral from 'components/IFormGeneral';
import AddPipelinePhoto from 'components/AddPipelinePhoto';
import PipelinePhotoList from 'components/PipelinePhotoList';

const Photos = ({ pipelineId, iform }) => {
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
  });

  const handleChangeFilter = e =>
    setFilter({
      ...filter,
      e,
    });

  return (
    <div className="border-top-0 border p-3 bg-white">
      <div className="d-flex mb-4">
        <div className="mr-auto">
          <AddPipelinePhoto pipeline={{ id: pipelineId }} filter={filter} />
        </div>
        <div className="mr-2">
          <IFormHistory history={iform.history} />
        </div>
        <IFormGeneral pipelineId={pipelineId} iform={iform} />
      </div>
      <PipelinePhotoList
        view="THUMBNAIL"
        pipeline={{ id: pipelineId }}
        filter={filter}
        onChangeFilter={handleChangeFilter}
      />
    </div>
  );
};

export default Photos;
