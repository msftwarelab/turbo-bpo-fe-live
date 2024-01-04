import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import { withApollo } from 'react-apollo';
import { Button, Modal } from 'react-bootstrap';
import removeNull from 'utils/removeNull';
import setErrorMessage from 'utils/setErrorMessage';
import removeTypeName from 'utils/removeTypeName';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import ALL_USER from 'queries/allUser';
import UserForm from '../UserForm';
import { UPDATE_USER } from './mutations';

const EditUser = ({ user, client, filter }) => {
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleShow = () => setShow(!isShow);

  const handleSubmit = async data => {
    setLoading(true);
    const input = { ...removeNull(data) };
    delete input.id;
    delete input.createdDateTime;

    try {
      const {
        data: { updateUser },
      } = await client.mutate({
        mutation: UPDATE_USER,
        variables: {
          id: user.id,
          input,
        },
        refetchQueries: [
          {
            query: ALL_USER,
            variables: { filter },
          },
        ],
      });
      setLoading(false);
      if (updateUser) cogoToast.success('Complete');
      else cogoToast.error(setErrorMessage());
      handleShow();
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
      handleShow();
    }
  };

  const initialValues = { ...removeTypeName(user), password: null };
  delete initialValues.logs;

  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>
        <FontAwesomeIcon icon={faEdit} />
      </Button>
      <Modal show={isShow} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <UserForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onClose={handleShow}
          isLoading={isLoading}
        />
      </Modal>
    </>
  );
};

export default withApollo(EditUser);
