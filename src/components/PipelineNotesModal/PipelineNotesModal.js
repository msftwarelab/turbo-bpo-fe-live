import React, { useState } from 'react';
import { Modal, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote } from '@fortawesome/free-solid-svg-icons';
import { useRightClickDisabled } from 'contexts/RightClickDisabled';
import AddPipelineNote from 'components/AddPipelineNote';
import PipelineNoteList from 'components/PipelineNoteList/PipelineNoteList';

const PipelineNotesModal = ({ pipeline, pipelineFilter }) => {
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

  const renderTooltipNotes = props => (
    <Tooltip {...props}>View or Add Notes</Tooltip>
  );

  return (
    <>
      <div>
        <a href="#/" onClick={handleShow}>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltipNotes}
          >
            <FontAwesomeIcon icon={faStickyNote} />
          </OverlayTrigger>
        </a>{' '}
        {pipeline.pipelineNoteTotal > 0 ? pipeline.pipelineNoteTotal : null}
      </div>
      {isShow && (
        <Modal show onHide={handleShow} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Notes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <AddPipelineNote
                pipeline={pipeline}
                filter={filter}
                pipelineFilter={pipelineFilter}
              />
            </div>
            <PipelineNoteList
              pipeline={pipeline}
              filter={filter}
              onChangeFilter={handleFilter}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default PipelineNotesModal;
