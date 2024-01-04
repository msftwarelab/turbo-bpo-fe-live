import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import QualityControlRequestList from './components/QualityControlRequestList';
import { StyledQcRequestContainer } from './styles';

const QualityControlRequest = () => {
  const [isShow, setShow] = useState(false);
  const handleShowModal = () => setShow(!isShow);
  return (
    <>
      <Button className="mr-2" onClick={handleShowModal}>
        QC Request
      </Button>
      {isShow && (
        <Modal show size="xl" onHide={handleShowModal}>
          <Modal.Header closeButton>
            <Modal.Title>QC Request</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <StyledQcRequestContainer>
              <QualityControlRequestList />
            </StyledQcRequestContainer>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default QualityControlRequest;
