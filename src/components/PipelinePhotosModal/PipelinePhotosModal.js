import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Modal, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import AddPipelinePhoto from 'components/AddPipelinePhoto';
import PipelinePhotoList from 'components/PipelinePhotoList';
import { useRightClickDisabled } from 'contexts/RightClickDisabled';
import ALL_PIPELINE_PHOTO from 'queries/allPipelinePhoto';
import DownloadFiles from 'components/DownloadFiles';
import DeletePhotos from 'components/DeletePhotos';

const PipelinePhotosModal = ({ pipeline, pipelineFilter }) => {
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
  });

  const { loading, error, data = {} } = useQuery(ALL_PIPELINE_PHOTO, {
    variables: {
      pipelineId: pipeline.id,
      filter: { ...filter, limit: 1000 },
    },
  });
  const { allPipelinePhoto = {} } = data;
  const { results = [] } = allPipelinePhoto;

  const [isShow, setShow] = useState(false);
  const [view, setView] = useState('LIST');
  const { setRightClickDisabled } = useRightClickDisabled();
  const handleShow = () => {
    setFilter({
      offset: 0,
      limit: 20,
    });
    setShow(!isShow);
    setRightClickDisabled(!isShow);
  };
  const handleFilter = e => setFilter(e);
  const handleView = e => setView(e);
  const handleSelectedPhotos = e => setSelectedPhotos(e);
  const handleRemoveSelected = () => setSelectedPhotos([]);

  const renderTooltipPhotos = props => (
    <Tooltip {...props}>View or Add Photos</Tooltip>
  );

  return (
    <>
      <div>
        <a href="#/" onClick={handleShow}>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltipPhotos}
          >
            <FontAwesomeIcon icon={faCamera} />
          </OverlayTrigger>
        </a>{' '}
        {pipeline.pipelinePhotoTotal > 0 ? pipeline.pipelinePhotoTotal : null}
      </div>
      {isShow && (
        <Modal show onHide={handleShow} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Photos</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <div className="d-flex">
                <div className="mr-auto d-flex">
                  <div className="mr-2">
                    <AddPipelinePhoto
                      pipeline={pipeline}
                      filter={filter}
                      pipelineFilter={pipelineFilter}
                    />
                  </div>
                  <div className="mr-2">
                    <DownloadFiles
                      label="Download"
                      zipName={pipeline.address}
                      selectedFiles={selectedPhotos}
                    />
                  </div>
                  <div className="mr-2">
                    {!loading && !error && (
                      <DownloadFiles
                        label="Download All"
                        zipName={pipeline.address}
                        selectedFiles={results}
                      />
                    )}
                  </div>
                  <DeletePhotos
                    pipelineId={pipeline.id}
                    selectedPhotos={selectedPhotos}
                    pipelineFilter={pipelineFilter}
                    pipelinePhotoFilter={filter}
                    onDelete={handleRemoveSelected}
                  />
                </div>
                <Button className="mr-2" onClick={() => handleView('LIST')}>
                  List
                </Button>
                <Button onClick={() => handleView('THUMBNAIL')}>
                  Thumbnail
                </Button>
              </div>
            </div>
            <PipelinePhotoList
              selectedPhotos={selectedPhotos}
              onSelectedPhotos={handleSelectedPhotos}
              pipeline={pipeline}
              view={view}
              filter={filter}
              pipelineFilter={pipelineFilter}
              onChangeFilter={handleFilter}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default PipelinePhotosModal;
