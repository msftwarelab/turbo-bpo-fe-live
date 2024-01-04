import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import QualityControlHistoryList from './components/QualityControlHistoryList';
import { StyledHistoryListContainer } from './styles';

const QualityControlHistory = () => {
  const [isShow, setShow] = useState(false);
  const handleShowModal = () => setShow(!isShow);
  return (
    <>
      <Button className="mr-2" onClick={handleShowModal}>
        My QC History
      </Button>
      {isShow && (
        <Modal show size="xl" onHide={handleShowModal}>
          <Modal.Header closeButton>
            <Modal.Title>My QC History</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <StyledHistoryListContainer>
              <QualityControlHistoryList />
            </StyledHistoryListContainer>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default QualityControlHistory;
