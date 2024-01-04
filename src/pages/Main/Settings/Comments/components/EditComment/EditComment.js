import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import { withApollo } from 'react-apollo';
import ALL_COMMENT from 'queries/allComment';
import CommentForm from '../CommentForm';
import { UPDATE_COMMENT } from './mutations';

const EditComment = ({ comment, client }) => {
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async e => {
    setLoading(true);
    try {
      const {
        data: { updateComment },
      } = await client.mutate({
        mutation: UPDATE_COMMENT,
        variables: {
          id: comment.id,
          value: e.value,
        },
        refetchQueries: [
          {
            query: ALL_COMMENT,
          },
        ],
      });
      setLoading(false);
      if (updateComment) cogoToast.success('Comment updated');
      else cogoToast.error(setErrorMessage());
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };

  return (
    <CommentForm
      initialValues={comment}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};

export default withApollo(EditComment);
