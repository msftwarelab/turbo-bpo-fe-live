import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import QualityControlList from './components/QualityControlList';

const QualityControlsRequestModal = ({ pipeline }) => {
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
        {pipeline.qcTotal}
      </div>
      {isShow && (
        <Modal show onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Quality Control</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <QualityControlList
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

export default QualityControlsRequestModal;
