import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import { withApollo } from 'react-apollo';
import { Button } from 'react-bootstrap';
import ConfirmModal from 'components/ConfirmModal';
import ALL_COMMENT from 'queries/allComment';
import { SET_COMMENT_DEFAULT } from './mutations';

const SetDefault = ({ client }) => {
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleShow = () => setShow(!isShow);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const {
        data: { setCommentDefault },
      } = await client.mutate({
        mutation: SET_COMMENT_DEFAULT,
        variables: {},
        refetchQueries: [
          {
            query: ALL_COMMENT,
          },
        ],
      });
      setLoading(false);
      if (setCommentDefault)
        cogoToast.success('Comments are now back to default');
      else cogoToast.error(setErrorMessage());
      handleShow();
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Default
      </Button>
      <ConfirmModal
        show={isShow}
        onClose={handleShow}
        onAccept={handleSubmit}
        isLoading={isLoading}
        title="WARNING!"
        description="This action will RESET all categories and comments. This action cannot be reversed. Do you wish to continue?"
      />
    </>
  );
};

export default withApollo(SetDefault);
