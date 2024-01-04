import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import pick from 'lodash/pick';
import removeTypeName from 'utils/removeTypeName';
import setErrorMessage from 'utils/setErrorMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation } from '@apollo/react-hooks';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import removeNull from 'utils/removeNull';
import { Button, Modal } from 'react-bootstrap';
import UPDATE_REVIEW from 'mutations/updateReview';
import ALL_REVIEW from 'queries/allReview';
import ReviewForm from '../ReviewForm';

const EditReview = ({ review, filter }) => {
  const [isLoading, setLoading] = useState(false);
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);
  const [editReview] = useMutation(UPDATE_REVIEW);
  const handleSubmit = async data => {
    setLoading(true);
    const input = { ...removeNull(data) };
    delete input.id;
    delete input.address;
    try {
      const {
        data: { updateReview },
      } = await editReview({
        variables: {
          id: review.id,
          input,
        },
        refetchQueries: [
          {
            query: ALL_REVIEW,
            variables: { filter },
          },
        ],
      });
      setLoading(false);
      if (updateReview) cogoToast.success('Review updated');
      else cogoToast.error(setErrorMessage());
      handleShow();
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
      handleShow();
    }
  };
  const initialValues = pick(removeTypeName(review), [
    'id',
    'reviewDescription',
    'address',
  ]);
  return (
    <>
      <Button
        variant="primary"
        size="sm"
        onClick={handleShow}
        style={{ width: '30px' }}
      >
        <FontAwesomeIcon icon={faEdit} />
      </Button>
      {isShow && (
        <Modal show size="lg" onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Edit review</Modal.Title>
          </Modal.Header>
          <ReviewForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            onClose={handleShow}
            isLoading={isLoading}
            isEdit
          />
        </Modal>
      )}
    </>
  );
};

export default EditReview;
