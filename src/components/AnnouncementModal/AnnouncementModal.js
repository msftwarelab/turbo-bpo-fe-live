import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AnnouncementModal = ({ wait, show, onRead, subject, message }) => {
  const [isShow, setShow] = useState(show);
  const [isShown, setShown] = useState(false);
  const [isChecked, setChecked] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShown(true);
    }, wait);
  });
  const handleCheck = () => setChecked(!isChecked);
  const handleShow = () => setShow(!isShow);
  const handleRead = () => {
    handleShow();
    if (isChecked) onRead();
  };

  if (isShown)
    return (
      <Modal show={isShow} onHide={handleShow} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{subject}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div dangerouslySetInnerHTML={{ __html: message }} />
        </Modal.Body>
        <Modal.Footer>
          <Form.Check
            type="checkbox"
            id="read-announcement"
            label="Don't display this message again"
            checked={isChecked}
            onChange={handleCheck}
            className="mr-auto"
          />
          <Button onClick={handleRead}>Ok</Button>
        </Modal.Footer>
      </Modal>
    );
  return null;
};

export default AnnouncementModal;
