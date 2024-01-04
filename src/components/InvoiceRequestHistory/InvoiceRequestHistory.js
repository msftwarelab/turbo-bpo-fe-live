import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import InvoiceRequestHistoryList from 'components/InvoiceRequestHistoryList';

const InvoiceRequestHistory = () => {
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Request History
      </Button>
      {isShow && (
        <Modal show onHide={handleShow} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>History</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InvoiceRequestHistoryList />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default InvoiceRequestHistory;
