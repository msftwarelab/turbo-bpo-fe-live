import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import setErrorMessage from 'utils/setErrorMessage';
import cogoToast from 'cogo-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import UPDATE_BILLING from 'mutations/updateBilling';
import billingStatusOptions from 'constants/billingStatusOptions';
import ALL_BILLING from 'queries/allBilling';
import { Button, Form } from 'react-bootstrap';
import { shape } from 'prop-types';

const ChangeBillingStatus = ({ billing, filter }) => {
  const [status, setStatus] = useState(billing.status);
  const [isEdit, setEdit] = useState(false);
  const [updateBilling] = useMutation(UPDATE_BILLING);
  const handleChange = e => {
    const { value } = e.target;
    setStatus(value);
  };
  const handleEdit = () => setEdit(!isEdit);
  const [isLoading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updateBilling({
        variables: {
          id: billing.id,
          input: {
            status,
          },
        },
        refetchQueries: [
          {
            query: ALL_BILLING,
            variables: { filter },
          },
        ],
      });
      cogoToast.success('Billing deleted');
      setLoading(false);
      handleEdit();
    } catch (err) {
      cogoToast.error(setErrorMessage(err));
      setLoading(false);
    }
  };
  return (
    <div className="d-flex">
      {isEdit ? (
        <>
          <Form.Control
            as="select"
            onChange={handleChange}
            className="mr-2"
            style={{ width: 100 }}
            value={status}
          >
            {billingStatusOptions.map((item, key) => (
              <option key={key} value={item.value}>
                {item.label}
              </option>
            ))}
          </Form.Control>
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
          <div className="mr-2">{status}</div>
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

ChangeBillingStatus.propTypes = {
  billing: shape({}),
  filter: shape({}),
};

ChangeBillingStatus.defaultProps = {
  billing: {},
  filter: {},
};
export default ChangeBillingStatus;
