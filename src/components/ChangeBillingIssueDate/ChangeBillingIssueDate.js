import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import setErrorMessage from 'utils/setErrorMessage';
import cogoToast from 'cogo-toast';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import UPDATE_BILLING from 'mutations/updateBilling';
import Datetime from 'react-datetime';
import ALL_BILLING from 'queries/allBilling';
import { Button } from 'react-bootstrap';
import { shape } from 'prop-types';

const ChangeBillingIssueDate = ({ billing, filter }) => {
  const [issueDate, setIssueDate] = useState(billing.date);
  const [isEdit, setEdit] = useState(false);
  const [updateBilling] = useMutation(UPDATE_BILLING);
  const handleChange = value => {
    setIssueDate(value.toISOString());
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
            date: moment(issueDate).format('YYYY-MM-DD'),
          },
        },
        refetchQueries: [
          {
            query: ALL_BILLING,
            variables: { filter },
          },
        ],
      });
      cogoToast.success('Billing updated');
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
          <div className="mr-2">
            <Datetime
              onChange={handleChange}
              value={moment(issueDate).format('MMM DD YYYY')}
              inputProps={{
                className: 'form-control bg-white',
                placeholder: 'Date',
                readOnly: true,
              }}
              closeOnSelect
              timeFormat={false}
            />
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
          <div className="mr-2">{moment(issueDate).format('MMM DD YYYY')}</div>
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

ChangeBillingIssueDate.propTypes = {
  billing: shape({}),
  filter: shape({}),
};

ChangeBillingIssueDate.defaultProps = {
  billing: {},
  filter: {},
};
export default ChangeBillingIssueDate;
