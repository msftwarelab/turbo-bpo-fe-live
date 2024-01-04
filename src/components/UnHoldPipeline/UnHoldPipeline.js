import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { string, func, bool } from 'prop-types';

const UnHoldPipeline = ({ reason, onUnHold, isLoading }) => {
  const [newReason, setNewReason] = useState(reason);
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);
  const handleChange = e => {
    const { value } = e.target;
    setNewReason(value);
  };
  const handleSubmit = () => {
    onUnHold(newReason);
  };
  return (
    <>
      <Button onClick={handleShow} disabled={isLoading}>
        Unhold
      </Button>
      {isShow && (
        <Modal show onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Unhold reason</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              as="textarea"
              rows="3"
              onChange={handleChange}
              value={newReason}
              placeholder="UnHold reason"
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

UnHoldPipeline.propTypes = {
  onUnHold: func,
  reason: string,
  isLoading: bool,
};

UnHoldPipeline.defaultProps = {
  onUnHold: e => e,
  reason: null,
  isLoading: false,
};

export default UnHoldPipeline;
