import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import AddCreditForm from './AddCreditForm';

const AddCreditModal = ({ onAddCredit, addedCredit, isLoading }) => {
  const [isShowModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(!isShowModal);
  const handleSubmit = e => {
    onAddCredit(e);
    handleShow();
  };
  const StyledModal = styled(Modal)`
    background: rgba(0, 0, 0, 0.5);
  `;
  
  return (
    <>
      <Button disabled={isLoading} onClick={handleShow}>
        Add Credit
      </Button>
      <StyledModal show={isShowModal} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Add Credit</Modal.Title>
        </Modal.Header>
        <AddCreditForm
          onClose={handleShow}
          onSubmit={handleSubmit}
          addedCredit={addedCredit}
        />
      </StyledModal>
    </>
  );
};

export default AddCreditModal;
