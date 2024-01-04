import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import setErrorMessage from 'utils/setErrorMessage';
import cogoToast from 'cogo-toast';
import removeTypeName from 'utils/removeTypeName';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import UPDATE_BILLING from 'mutations/updateBilling';
import ALL_BILLING from 'queries/allBilling';
import { Button } from 'react-bootstrap';
import { shape } from 'prop-types';
import DeleteModal from 'components/DeleteModal';

const DeleteBillingEntry = ({ billing, billingEntry, filter }) => {
  const [updateBilling] = useMutation(UPDATE_BILLING);
  const [isLoading, setLoading] = useState(false);

  const [showModal, revealModal] = useState(false);

  const handleCloseModal = () => revealModal(false);
  const handleShowModal = () => revealModal(true);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await updateBilling({
        variables: {
          id: billing.id,
          input: {
            entries: billing.entries
              .map(item => ({
                ...removeTypeName(item),
                type: item.type || 'ORDER',
              }))
              .filter(item => item.orderNumber !== billingEntry.orderNumber),
          },
        },
        refetchQueries: [
          {
            query: ALL_BILLING,
            variables: { filter },
          },
        ],
      });
      cogoToast.success('Billing entry deleted');
      setLoading(false);
    } catch (err) {
      cogoToast.error(setErrorMessage(err));
      setLoading(false);
    }
  };
  return (
    <>
      <Button onClick={handleShowModal} disabled={isLoading}>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
      <DeleteModal
        show={showModal}
        onClose={handleCloseModal}
        onAccept={handleDelete}
        isLoading={isLoading}
        body={`Would you like to delete order number ${billingEntry.orderNumber}?`}
      />
    </>
  );
};

DeleteBillingEntry.propTypes = {
  billing: shape({}),
  billingEntry: shape({}),
  filter: shape({}),
};

DeleteBillingEntry.defaultProps = {
  billing: {},
  billingEntry: {},
  filter: {},
};
export default DeleteBillingEntry;
