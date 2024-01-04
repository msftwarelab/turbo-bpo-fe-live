import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({
  show,
  isLoading,
  onClose,
  onAccept,
  title = 'Confirm delete',
  body = 'Are you sure you want to delete?'
}) => (
  <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <div>{body}</div>
    </Modal.Body>

    <Modal.Footer>
    <Button variant="warning" onClick={onAccept} disabled={isLoading}>
        Verify
      </Button>
      <Button variant="primary" onClick={onClose} disabled={isLoading}>
        Cancel
      </Button>
    </Modal.Footer>
  </Modal>
);

export default DeleteModal;
