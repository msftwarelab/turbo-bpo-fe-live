import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { string, bool, func } from 'prop-types';

const ConfirmModal = ({
  title,
  description,
  show,
  isLoading,
  onClose,
  onAccept,
  closeButton = true,
}) => (
  <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton={closeButton}>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <div>{description}</div>
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

ConfirmModal.propTypes = {
  title: string,
  description: string,
  show: bool,
  isLoading: bool,
  onClose: func,
  onAccept: func,
  closeButton: bool,
};

ConfirmModal.defaultProps = {
  title: null,
  description: null,
  show: false,
  isLoading: false,
  onClose: e => e,
  onAccept: e => e,
  closeButton: false,
};

export default ConfirmModal;
