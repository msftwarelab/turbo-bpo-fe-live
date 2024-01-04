import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import AddQCRequestNote from 'components/AddQCRequestNote';
import QCRequestNoteList from 'components/QCRequestNoteList';
import { StyledModal } from './styles'

const QCRequestNotesModal = ({ qcRequest, qcRequestFilter }) => {
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
  });
  const [isShow, setShow] = useState(false);
  const handleShow = () => {
    setFilter({
      offset: 0,
      limit: 20,
    });
    setShow(!isShow);
  };
  const handleFilter = e => setFilter(e);
  return (
    <>
      <div>
        <a href="#/" onClick={handleShow}>
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </a>{' '}
        {qcRequest.notesTotal}
      </div>
      {isShow && (
        <StyledModal show onHide={handleShow} size="lg">
          <StyledModal.Header closeButton>
            <StyledModal.Title>Notes</StyledModal.Title>
          </StyledModal.Header>
          <StyledModal.Body>
            <div className="mb-3">
              <AddQCRequestNote
                qcRequest={qcRequest}
                filter={filter}
                qcRequestFilter={qcRequestFilter}
              />
            </div>
            <QCRequestNoteList
              qcRequest={qcRequest}
              filter={filter}
              onChangeFilter={handleFilter}
            />
          </StyledModal.Body>
        </StyledModal>
      )}
    </>
  );
};

export default QCRequestNotesModal;
