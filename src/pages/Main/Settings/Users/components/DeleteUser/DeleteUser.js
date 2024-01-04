import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import { withApollo } from 'react-apollo';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from 'components/DeleteModal';
import setErrorMessage from 'utils/setErrorMessage';
import { DELETE_USER } from './mutations';
import ALL_USER from 'queries/allUser';

const DeleteUser = ({ user, client, filter }) => {
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleShow = () => setShow(!isShow);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const {
        data: { deleteUser },
      } = await client.mutate({
        mutation: DELETE_USER,
        variables: {
          id: user.id,
        },
        refetchQueries: [
          {
            query: ALL_USER,
            variables: { filter },
          },
        ],
      });
      setLoading(false);
      if (deleteUser) cogoToast.success('User successfully deleted');
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

export default withApollo(DeleteUser);
