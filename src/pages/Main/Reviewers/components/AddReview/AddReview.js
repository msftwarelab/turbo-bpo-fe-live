import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useMutation } from '@apollo/react-hooks';
import removeNull from 'utils/removeNull';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import SAVE_REVIEW from 'mutations/saveReview';
import ALL_REVIEW from 'queries/allReview';
import ReviewForm from '../ReviewForm';

const AddReview = ({ filter }) => {
  const [isLoading, setLoading] = useState(false);
  const [isShow, setShow] = useState(false);
  const handleShowModal = () => setShow(!isShow);
  const [saveReview] = useMutation(SAVE_REVIEW);
  const handleSubmit = async input => {
    setLoading(true);
    try {
      await saveReview({
        variables: {
          input: removeNull(input),
        },
        refetchQueries: [
          {
            query: ALL_REVIEW,
            variables: { filter },
          },
        ],
      });
      setLoading(false);
      cogoToast.success('Review successfully saved');
      handleShowModal();
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };
  return (
    <>
      <Button onClick={handleShowModal} className="btn-warning">
        Add review
      </Button>
      {isShow && (
        <Modal show onHide={handleShowModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add review</Modal.Title>
          </Modal.Header>
          <ReviewForm
            initialValues={{
              pipelineId: null,
              reviewDescription: null,
              attachment: null,
            }}
            onSubmit={handleSubmit}
            onClose={handleShowModal}
            isLoading={isLoading}
          />
        </Modal>
      )}
    </>
  );
};

export default AddReview;
