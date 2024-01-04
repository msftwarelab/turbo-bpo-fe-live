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
import orderTypeOptions from 'constants/orderTypeOptions';

const ChangeInvoiceOrderType = ({ invoice, filter }) => {
  const [orderType, setOrderType] = useState(invoice.orderType);
  const [isEdit, setEdit] = useState(false);
  const [updateInvoice] = useMutation(UPDATE_INVOICE);
  const handleChange = e => {
    const { value } = e.target;
    setOrderType(value);
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
            orderType,
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

  const invoiceValue = orderTypeOptions.find(item => item.value === orderType);
  return (
    <div className="d-flex">
      {isEdit ? (
        <>
          <div className="mr-2" style={{ width: 130 }}>
            <Form.Control
              as="select"
              name="orderType"
              onChange={handleChange}
              value={orderType || ''}
            >
              {orderTypeOptions.map(item => (
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
            {invoiceValue ? invoiceValue.label : orderType}
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

ChangeInvoiceOrderType.propTypes = {
  invoice: shape({}),
  filter: shape({}),
};

ChangeInvoiceOrderType.defaultProps = {
  invoice: {},
  filter: {},
};
export default ChangeInvoiceOrderType;
