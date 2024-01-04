import React, { useState } from 'react';
import moment from 'moment';
import { Modal, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/react-hooks';
import { shape } from 'prop-types';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import SAVE_BILLING from 'mutations/saveBilling';
import ALL_BILLING from 'queries/allBilling';
import BillingForm from '../BillingForm';
import BillingSearch from '../BillingSearch';

const AddBilling = ({ filter }) => {
  const [isLoading, setLoading] = useState(false);
  const [saveBilling] = useMutation(SAVE_BILLING);
  const [userId, setUserId] = useState(null);
  const [entryOptions, setEntryOptions] = useState([]);
  const [isShow, setShow] = useState(false);
  const handleShow = () => {
    setShow(!isShow);
    setEntryOptions([]);
  };
  const handleSubmit = async e => {
    if (!userId) {
      cogoToast.warn('User required');
      return;
    }
    setLoading(true);
    try {
      await saveBilling({
        variables: {
          input: {
            userId,
            invoiceNumber: e.invoiceNumber.toString(),
            date: e.date,
            dateFrom: e.dateFrom,
            dateTo: e.dateTo,
            dueDate: e.dueDate,
            entries: e.entries.map(item => {
              const newItem = item;
              delete newItem.status;
              return newItem;
            }),
          },
        },
        refetchQueries: [
          {
            query: ALL_BILLING,
            variables: { filter },
          },
        ],
      });
      cogoToast.success('Billing created');
      setEntryOptions([]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      cogoToast.error(setErrorMessage(err));
    }
  };
  const handleGenerate = data => {
    setUserId(data.userId);
    setEntryOptions(data.entries);
  };

  return (
    <>
      <Button onClick={handleShow} variant="warning">
        Add bill
      </Button>
      {isShow && (
        <Modal show onHide={handleShow} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Add bill</Modal.Title>
          </Modal.Header>

          <BillingSearch onGenerate={handleGenerate} />
          <BillingForm
            initialValues={{
              invoiceNumber: Math.floor(100000 + Math.random() * 900000),
              date: moment().format('YYYY-MM-DD'),
              dateFrom: null,
              dateTo: null,
              dueDate: moment()
                .add(7, 'days')
                .format('YYYY-MM-DD'),
              entries: entryOptions.map(item => ({
                orderNumber: item.orderNumber,
                description: item.address,
                amount: item.totalFee,
                status: item.status !== 'PAID' ? 'PENDING' : 'PAID',
                type: 'ORDER',
              })),
            }}
            onClose={handleShow}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </Modal>
      )}
    </>
  );
};

AddBilling.defaultProps = {
  filter: {},
};

AddBilling.propTypes = {
  filter: shape({}),
};

export default AddBilling;
