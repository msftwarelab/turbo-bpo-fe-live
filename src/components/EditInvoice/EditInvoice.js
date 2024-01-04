import React, { useState } from 'react';
import setErrorMessage from 'utils/setErrorMessage';
import cogoToast from 'cogo-toast';
import pick from 'lodash/pick';
import removeTypeName from 'utils/removeTypeName';
import { useMutation } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, Form } from 'react-bootstrap';
import UPDATE_INVOICE from 'mutations/updateInvoice';
import ALL_INVOICE_REQUEST from 'queries/allInvoiceRequest';
import ALL_INVOICE from 'queries/allInvoice';
import { shape, bool } from 'prop-types';

const fields = [
  'id',
  'isSuperRush',
  'isRush',
  'isInterior',
  'isRentalAddendum',
  'isInitialBpo',
  'isInspection',
  'isNoCsv',
  'isNoIFill',
  'isOtherPremium',
];

const fieldsLabel = {
  isSuperRush: 'Super rush',
  isRush: 'Rush',
  isInterior: 'Interior',
  isRentalAddendum: 'Rental Addendum',
  isInitialBpo: 'Initial BPO',
  isInspection: 'Inspection',
  isNoCsv: 'No CSV',
  isNoIFill: 'No Ifill',
  isOtherPremium: 'Other Premium',
};

const EditInvoice = ({ invoice, filter, isRequest }) => {
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const handleShow = () => setShow(!isShow);
  const [updateInvoice] = useMutation(UPDATE_INVOICE);
  const [input, setInput] = useState(pick(removeTypeName(invoice), fields));
  const handleSubmit = async () => {
    setLoading(true);
    const newInput = { ...input };
    delete newInput.id;
    try {
      await updateInvoice({
        variables: {
          id: invoice.id,
          input: newInput,
        },
        refetchQueries: [
          {
            query: isRequest ? ALL_INVOICE_REQUEST : ALL_INVOICE,
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

  const handleChange = e => {
    const { name } = e.target;
    if (name === 'isOtherPremium' && !input.isOtherPremium) {
      setInput({
        ...input,
        isNoCsv: false,
        isNoIFill: false,
        [name]: !input[name],
      });
    } else if (
      (name === 'isNoCsv' || name === 'isNoIFill') &&
      input.isOtherPremium
    ) {
      setInput({
        ...input,
        isNoCsv: false,
        isNoIFill: false,
      });
    } else {
      setInput({
        ...input,
        [name]: !input[name],
      });
    }
  };

  return (
    <>
      <Button onClick={handleShow} disabled={isLoading} variant="success">
        <FontAwesomeIcon icon={faEdit} />
      </Button>
      {isShow && (
        <Modal show onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>REQUEST INVOICE</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {fields
              .filter(item => item !== 'id')
              .map(item => (
                <div key={item} className="mb-3">
                  <Form.Check
                    name={item}
                    type="checkbox"
                    id={item}
                    label={fieldsLabel[item]}
                    checked={input[item]}
                    onChange={handleChange}
                  />
                </div>
              ))}
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

EditInvoice.propTypes = {
  invoice: shape({}),
  filter: shape({}),
  isRequest: bool,
};

EditInvoice.defaultProps = {
  invoice: {},
  filter: {},
  isRequest: false,
};

export default EditInvoice;
