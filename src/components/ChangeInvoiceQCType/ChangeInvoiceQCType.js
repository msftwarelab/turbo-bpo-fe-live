import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import setErrorMessage from 'utils/setErrorMessage';
import cogoToast from 'cogo-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import ALL_INVOICE from 'queries/allInvoice';
import UPDATE_INVOICE from 'mutations/updateInvoice';
import { Button, Form } from 'react-bootstrap';
import { shape } from 'prop-types';
import notesOptions from 'constants/notesOptions';

const ChangeInvoiceQCType = ({ invoice, filter }) => {
  const [qcType, setQCType] = useState(invoice.qcType);
  const [isEdit, setEdit] = useState(false);
  const [updateInvoice] = useMutation(UPDATE_INVOICE);
  const handleChange = e => {
    const { value } = e.target;
    setQCType(value);
  };
  const handleEdit = () => setEdit(!isEdit);
  const [isLoading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updateInvoice({
        variables: {
          id: invoice.id,
          input: {
            qcType,
          },
        },
        refetchQueries: [
          {
            query: ALL_INVOICE,
            variables: { filter },
          },
        ],
      });
      cogoToast.success('Invoice updated');
      setLoading(false);
      handleEdit();
    } catch (err) {
      cogoToast.error(setErrorMessage(err));
      setLoading(false);
    }
  };

  const invoiceValue = notesOptions.find(item => item.value === qcType);
  return (
    <div className="d-flex">
      {isEdit ? (
        <>
          <div className="mr-2" style={{ width: 130 }}>
            <Form.Control
              as="select"
              name="qcType"
              onChange={handleChange}
              value={qcType || ''}
            >
              {notesOptions.map(item => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Form.Control>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            variant="success"
            className="mr-1"
          >
            <FontAwesomeIcon icon={faCheck} />
          </Button>
          <Button onClick={handleEdit}>
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </>
      ) : (
        <>
          <div className="mr-2">
            {invoiceValue ? invoiceValue.label : qcType}
          </div>
          <Button
            className="p-0"
            onClick={handleEdit}
            disabled={isLoading}
            variant="link"
          >
            Edit
          </Button>
        </>
      )}
    </div>
  );
};

ChangeInvoiceQCType.propTypes = {
  invoice: shape({}),
  filter: shape({}),
};

ChangeInvoiceQCType.defaultProps = {
  invoice: {},
  filter: {},
};
export default ChangeInvoiceQCType;
