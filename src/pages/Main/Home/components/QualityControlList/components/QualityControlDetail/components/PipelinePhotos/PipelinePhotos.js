import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import PipelinePhotoList from 'components/PipelinePhotoList';
import AddPipelinePhoto from 'components/AddPipelinePhoto';

const PipelinePhotos = ({ pipeline }) => {
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
  });
  const [view, setView] = useState('LIST');
  const handleFilter = e => setFilter(e);
  const handleView = e => setView(e);
  return (
    <div className="overflow-auto p-2">
      <div className="mb-3">
        <div className="d-flex">
          <div className="mr-auto">
            <AddPipelinePhoto pipeline={pipeline} filter={filter} />
          </div>
          <Button className="mr-2" onClick={() => handleView('LIST')}>
            List
          </Button>
          <Button onClick={() => handleView('THUMBNAIL')}>Thumbnail</Button>
        </div>
      </div>
      <PipelinePhotoList
        pipeline={pipeline}
        view={view}
        filter={filter}
        onChangeFilter={handleFilter}
      />
    </div>
  );
};

export default PipelinePhotos;
