import React, { useState } from 'react';
import { Modal, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import PipelineDocList from 'components/PipelineDocList';
import AddPipelineDoc from 'components/AddPipelineDoc';
import { useRightClickDisabled } from 'contexts/RightClickDisabled';
import DownloadFiles from 'components/DownloadFiles';
import DeleteDocs from 'components/DeleteDocs';

const PipelineDocsModal = ({ pipeline, pipelineFilter }) => {
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
  });
  const [isShow, setShow] = useState(false);
  const { setRightClickDisabled } = useRightClickDisabled();
  const handleShow = () => {
    setFilter({
      offset: 0,
      limit: 20,
    });
    setShow(!isShow);
    setRightClickDisabled(!isShow);
  }
  const handleFilter = e => setFilter(e);
  const handleSelectedDocs = e => setSelectedDocs(e);
  const handleRemoveSelected = () => setSelectedDocs([]);

  const renderTooltipDoc = props => (
    <Tooltip {...props}>View or Add Docs</Tooltip>
  );

  return (
    <>
      <div>
        <a href="#/" onClick={handleShow}>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltipDoc}
          >
            <FontAwesomeIcon icon={faFolder} />
          </OverlayTrigger>
        </a>{' '}
        {pipeline.pipelineDocTotal > 0 ? pipeline.pipelineDocTotal : null}
      </div>
      {isShow && (
        <Modal show onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Documents</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3 d-flex">
              <div className="mr-2">
                <AddPipelineDoc
                  pipeline={pipeline}
                  filter={filter}
                  pipelineFilter={pipelineFilter}
                />
              </div>
              <div className="mr-2">
                <DownloadFiles
                  label="Download"
                  zipName={pipeline.address}
                  selectedFiles={selectedDocs}
                />
              </div>
              <DeleteDocs
                pipelineId={pipeline.id}
                selectedDocs={selectedDocs}
                pipelineFilter={pipelineFilter}
                pipelineDocFilter={filter}
                onDelete={handleRemoveSelected}
              />
            </div>
            <PipelineDocList
              pipeline={pipeline}
              filter={filter}
              pipelineFilter={pipelineFilter}
              onChangeFilter={handleFilter}
              selectedDocs={selectedDocs}
              onSelectedDocs={handleSelectedDocs}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default PipelineDocsModal;
