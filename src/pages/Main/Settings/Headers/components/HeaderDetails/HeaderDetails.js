import React, { useState } from 'react';
import { withApollo } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import HeaderDetailList from './components/HeaderDetailList';

const HeaderDetails = ({ header }) => {
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);

  return (
    <>
      <Button onClick={handleShow} size="sm" className="mr-auto">
        <FontAwesomeIcon icon={faCog} />
      </Button>
      <Modal show={isShow} onHide={handleShow} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Header Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <HeaderDetailList headerId={header.id} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default withApollo(HeaderDetails);
