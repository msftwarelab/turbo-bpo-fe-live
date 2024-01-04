import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import setErrorMessage from 'utils/setErrorMessage';
import cogoToast from 'cogo-toast';
import removeTypeName from 'utils/removeTypeName';
import UPDATE_BILLING from 'mutations/updateBilling';
import ALL_BILLING from 'queries/allBilling';
import { Button, Modal } from 'react-bootstrap';
import BillingEntryForm from 'components/BillingEntryForm';
import { shape } from 'prop-types';

const AddCustomBillingEntry = ({ billing, filter }) => {
  const [isShow, setShow] = useState(false);
  const [updateBilling] = useMutation(UPDATE_BILLING);
  const handleShow = () => setShow(!isShow);
  const [isLoading, setLoading] = useState(false);
  const handleAdd = async newEntry => {
    setLoading(true);
    try {
      await updateBilling({
        variables: {
          id: billing.id,
          input: {
            entries: [...billing.entries, newEntry].map(item =>
              removeTypeName(item)
            ),
          },
        },
        refetchQueries: [
          {
            query: ALL_BILLING,
            variables: { filter },
          },
        ],
      });
      cogoToast.success('Billing entry updated');
      setLoading(false);
    } catch (err) {
      cogoToast.error(setErrorMessage(err));
      setLoading(false);
    }
  };
  return (
    <>
      <Button onClick={handleShow} disabled={isLoading} variant="warning">
        Add Billing Entry
      </Button>
      {isShow && (
        <Modal show onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Add Billing Entry</Modal.Title>
          </Modal.Header>
          <BillingEntryForm
            initialValues={{
              type: 'ORDER',
              description: null,
              amount: null,
            }}
            onSubmit={handleAdd}
            onClose={handleShow}
          />
        </Modal>
      )}
    </>
  );
};

AddCustomBillingEntry.propTypes = {
  billing: shape({}),
  filter: shape({}),
};

AddCustomBillingEntry.defaultProps = {
  billing: {},
  filter: {},
};
export default AddCustomBillingEntry;
