import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import { withApollo } from 'react-apollo';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from 'components/DeleteModal';
import setErrorMessage from 'utils/setErrorMessage';
import DELETE_REVIEW from 'mutations/deleteReview';
import ALL_REVIEW from 'queries/allReview';

const DeleteReview = ({ review, client, filter }) => {
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleShow = () => setShow(!isShow);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const {
        data: { deleteReview },
      } = await client.mutate({
        mutation: DELETE_REVIEW,
        variables: {
          id: review.id,
        },
        refetchQueries: [
          {
            query: ALL_REVIEW,
            variables: { filter },
          },
        ],
      });
      setLoading(false);
      if (deleteReview) cogoToast.success('Review successfully deleted');
      else cogoToast.error(setErrorMessage());
      handleShow();
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
      handleShow();
    }
  };

  return (
    <>
      <Button
        variant="primary"
        size="sm"
        onClick={handleShow}
        style={{ width: '30px', marginTop: '3px' }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>
      <DeleteModal
        show={isShow}
        isLoading={isLoading}
        onAccept={handleDelete}
        onClose={handleShow}
      />
    </>
  );
};

export default withApollo(DeleteReview);
