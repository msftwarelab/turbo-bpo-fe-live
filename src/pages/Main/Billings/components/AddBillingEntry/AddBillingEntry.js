import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { func } from 'prop-types';
import BillingEntryForm from 'components/BillingEntryForm';

const AddBillingEntry = ({ onSubmit }) => {
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);
  const handleSubmit = e => {
    onSubmit(e);
    handleShow();
  };
  return (
    <>
      <Button onClick={handleShow}>Add Billing Entry</Button>
      {isShow && (
        <Modal show onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Add Billing Entry</Modal.Title>
          </Modal.Header>

          <BillingEntryForm
            initialValues={{
              type: 'ORDER',
              orderNumber: null,
              description: null,
              amount: null,
            }}
            onSubmit={handleSubmit}
            onClose={handleShow}
          />
        </Modal>
      )}
    </>
  );
};
AddBillingEntry.propTypes = {
  onSubmit: func,
};
AddBillingEntry.defaultProps = {
  onSubmit: e => e,
};
export default AddBillingEntry;
