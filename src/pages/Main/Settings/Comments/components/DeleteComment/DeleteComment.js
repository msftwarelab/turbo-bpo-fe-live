import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import { withApollo } from 'react-apollo';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from 'components/DeleteModal';
import ALL_COMMENT from 'queries/allComment';
import { DELETE_COMMENT } from './mutations';

const DeleteComment = ({ comment, client }) => {
  const [isLoading, setLoading] = useState(false);
  const [isDeleteComment, setDeleteComment] = useState(false);

  const handleDeleteComment = () => setDeleteComment(!isDeleteComment);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const {
        data: { deleteComment },
      } = await client.mutate({
        mutation: DELETE_COMMENT,
        variables: {
          id: comment.id,
        },
        refetchQueries: [
          {
            query: ALL_COMMENT,
          },
        ],
      });
      setLoading(false);
      if (deleteComment) cogoToast.success('Comment successfully deleted');
      else cogoToast.error(setErrorMessage());
      handleDeleteComment();
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };

  return (
    <>
      <DeleteModal
        show={isDeleteComment}
        isLoading={isLoading}
        onClose={handleDeleteComment}
        onAccept={handleSubmit}
        title="Delete comment"
      />
      <Button variant="primary" onClick={handleDeleteComment}>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </>
  );
};

export default withApollo(DeleteComment);
