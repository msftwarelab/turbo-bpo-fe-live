import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { string, func, bool } from 'prop-types';

const CancelPipeline = ({ reason, disabled, onCancel, isLoading }) => {
  const [newReason, setNewReason] = useState(reason);
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);
  const handleChange = e => {
    const { value } = e.target;
    setNewReason(value);
  };
  const handleSubmit = () => {
    onCancel(newReason);
  };
  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        disabled={isLoading || disabled}
      >
        Cancel
      </Button>
      {isShow && (
        <Modal show onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Cancel reason</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              as="textarea"
              rows="3"
              onChange={handleChange}
              value={newReason}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={handleSubmit}
              variant="warning"
              disabled={isLoading}
            >
              Save
            </Button>
            <Button onClick={handleShow} disabled={isLoading}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

CancelPipeline.propTypes = {
  onCancel: func,
  reason: string,
  disabled: bool,
  isLoading: bool,
};

CancelPipeline.defaultProps = {
  onCancel: e => e,
  reason: null,
  disabled: false,
  isLoading: false,
};

export default CancelPipeline;
