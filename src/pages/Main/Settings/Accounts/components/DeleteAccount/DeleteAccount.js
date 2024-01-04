import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import { withApollo } from 'react-apollo';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from 'components/DeleteModal';
import ALL_ACCOUNT from 'queries/allAccount';
import setErrorMessage from 'utils/setErrorMessage';
import { DELETE_ACCOUNT } from './mutations';

const DeleteAccount = ({ account, client, filter }) => {
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleShow = () => setShow(!isShow);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const {
        data: { deleteAccount },
      } = await client.mutate({
        mutation: DELETE_ACCOUNT,
        variables: {
          id: account.id,
        },
        refetchQueries: [
          {
            query: ALL_ACCOUNT,
            variables: { filter },
          },
        ],
      });
      setLoading(false);
      if (deleteAccount) cogoToast.success('Account successfully deleted');
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
      <Button variant="primary" size="sm" onClick={handleShow}>
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

export default withApollo(DeleteAccount);
