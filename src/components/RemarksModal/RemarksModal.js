import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { string } from 'prop-types';

const RemarksModal = ({ remarks }) => {
  const { isShow, setShow } = useState(false);
  const handleShow = () => setShow(!isShow);
  return remarks ? (
    <>
      {isShow && (
        <Modal show onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Choose image</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div>{remarks}</div>
          </Modal.Body>
        </Modal>
      )}
      <Button variant="link" className="p-0">
        View Remarks
      </Button>
    </>
  ) : null;
};

RemarksModal.defaultProps = {
  remarks: null,
};

RemarksModal.propTypes = {
  remarks: string,
};

export default RemarksModal;
