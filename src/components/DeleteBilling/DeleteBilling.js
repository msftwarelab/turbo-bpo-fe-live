import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import setErrorMessage from 'utils/setErrorMessage';
import cogoToast from 'cogo-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import DELETE_BILLING from 'mutations/deleteBilling';
import ALL_BILLING from 'queries/allBilling';
import { Button } from 'react-bootstrap';
import { shape } from 'prop-types';
import DeleteModal from 'components/DeleteModal';

const DeleteBilling = ({ billing, filter }) => {
  const [deleteBilling] = useMutation(DELETE_BILLING);
  const [isLoading, setLoading] = useState(false);

  const [isShowModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteBilling({
        variables: { id: billing.id },
        refetchQueries: [
          {
            query: ALL_BILLING,
            variables: { filter },
          },
        ],
      });
      cogoToast.success('Billing deleted');
      setLoading(false);
      handleCloseModal();
    } catch (err) {
      cogoToast.error(setErrorMessage(err));
      setLoading(false);
    }
  };
  return (
    <>
      <Button onClick={handleShowModal} disabled={isLoading} variant="primary">
        <FontAwesomeIcon icon={faTrash} />
      </Button>
      <DeleteModal
        show={isShowModal}
        onClose={handleCloseModal}
        onAccept={handleDelete}
        isLoading={isLoading}
        body={`Would you like to delete billing with order number ${billing.orderNumber}?`}
      />
    </>
  );
};

DeleteBilling.propTypes = {
  billing: shape({}),
  filter: shape({}),
};

DeleteBilling.defaultProps = {
  billing: {},
  filter: {},
};
export default DeleteBilling;
