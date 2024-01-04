import React, { useState } from 'react';
import setErrorMessage from 'utils/setErrorMessage';
import cogoToast from 'cogo-toast';
import { useMutation } from '@apollo/react-hooks';
import { Button, Modal } from 'react-bootstrap';
import { shape } from 'prop-types';
import SAVE_INVOICE_REQUEST from 'mutations/saveInvoiceRequest';
import ALL_INVOICE_REQUEST from 'queries/allInvoiceRequest';
import InvoiceRequestForm from 'components/InvoiceRequestForm';
import removeNull from 'utils/removeNull';

const AddInvoiceRequest = ({ filter }) => {
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const handleShow = () => setShow(!isShow);
  const [saveInvoice] = useMutation(SAVE_INVOICE_REQUEST);
  const handleSubmit = async input => {
    setLoading(true);
    const newInput = { ...input };
    delete newInput.id;
    try {
      await saveInvoice({
        variables: {
          input: removeNull(newInput),
        },
        refetchQueries: [
          {
            query: ALL_INVOICE_REQUEST,
            variables: { filter },
          },
        ],
      });
      setLoading(false);
      handleShow();
      cogoToast.success('Invoice request created');
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };

  return (
    <>
      <Button onClick={handleShow} disabled={isLoading}>
        Add
      </Button>
      {isShow && (
        <Modal show onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Add Invoice</Modal.Title>
          </Modal.Header>
          <InvoiceRequestForm
            initialValues={{
              type: 'SUBMIT',
              orderNumber: null,
              qcType: null,
              remarks: null,
            }}
            onSubmit={handleSubmit}
          />
        </Modal>
      )}
    </>
  );
};

AddInvoiceRequest.defaultProps = {
  filter: {},
};

AddInvoiceRequest.propTypes = {
  filter: shape({}),
};

export default AddInvoiceRequest;
