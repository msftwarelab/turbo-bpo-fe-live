import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { string } from 'prop-types';

const MLSComments = ({ comments }) => {
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);
  return (
    <>
      <Button variant="link" className="p-0" onClick={handleShow}>
        Show Comments
      </Button>
      {isShow && (
        <Modal show onHide={handleShow} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>MLS Comments</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{comments}</p>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

MLSComments.propTypes = {
  comments: string,
};

MLSComments.defaultProps = {
  comments: null,
};

export default MLSComments;
