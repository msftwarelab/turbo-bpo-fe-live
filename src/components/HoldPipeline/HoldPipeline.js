import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { string, func, bool } from 'prop-types';

const HoldPipeline = ({ reason, onHold, isLoading }) => {
  const [newReason, setNewReason] = useState(reason);
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);
  const handleChange = e => {
    const { value } = e.target;
    setNewReason(value);
  };
  const handleSubmit = () => {
    onHold(newReason);
  };
  return (
    <>
      <Button onClick={handleShow} disabled={isLoading}>
        Hold
      </Button>
      {isShow && (
        <Modal show onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Hold reason</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              as="textarea"
              rows="3"
              onChange={handleChange}
              value={newReason}
              placeholder="Hold reason"
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

HoldPipeline.propTypes = {
  onHold: func,
  reason: string,
  isLoading: bool,
};

HoldPipeline.defaultProps = {
  onHold: e => e,
  reason: null,
  isLoading: false,
};

export default HoldPipeline;
