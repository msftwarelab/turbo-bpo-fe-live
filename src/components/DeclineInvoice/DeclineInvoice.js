import React, { useState } from 'react';
import setErrorMessage from 'utils/setErrorMessage';
import cogoToast from 'cogo-toast';
import { useMutation } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button, Form, Modal } from 'react-bootstrap';
import CANCEL_INVOICE from 'mutations/cancelInvoice';
import ALL_INVOICE from 'queries/allInvoice';

const DeclineInvoice = ({ invoice, filter }) => {
  const [isShow, setShow] = useState(false);
  const [remarks, setRemarks] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [cancelInvoice] = useMutation(CANCEL_INVOICE);
  const handleShow = () => setShow(!isShow);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await cancelInvoice({
        variables: {
          id: invoice.id,
          reason: remarks,
        },
        refetchQueries: [
          {
            query: ALL_INVOICE,
            variables: { filter },
          },
        ],
      });
      setLoading(false);
      handleShow();
      cogoToast.success('Invoice updated');
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };

  return (
    <>
      <Button onClick={handleShow} disabled={isLoading}>
        <FontAwesomeIcon icon={faTimes} />
      </Button>
      {isShow && (
        <Modal show onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Cancel Invoice</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Control
                as="textarea"
                name="remarks"
                placeholder="Enter remarks here"
                onChange={e => setRemarks(e.target.value)}
                value={remarks || ''}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleShow}>
              Cancel
            </Button>
            <Button
              variant="warning"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default DeclineInvoice;
