import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import { withApollo } from 'react-apollo';
import { Modal, Button } from 'react-bootstrap';
import setErrorMessage from 'utils/setErrorMessage';
import UserForm from '../UserForm';
import { SAVE_USER } from './mutations';
import ALL_USER from 'queries/allUser';

const AddUser = ({ client, filter }) => {
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleShow = () => setShow(!isShow);

  const handleSubmit = async input => {
    setLoading(true);
    try {
      const {
        data: { saveUser },
      } = await client.mutate({
        mutation: SAVE_USER,
        variables: {
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
      if (saveUser) cogoToast.success('User created');
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
      <Button onClick={handleShow} variant="warning" className="mr-auto">
        Add User
      </Button>
      <Modal show={isShow} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>

        <UserForm
          form="userForm"
          initialValues={{
            roles: [],
            status: null,
            email: null,
            firstName: null,
            lastName: null,
            password: null,
            company: null,
            phoneNumber: null,
            address: null,
            city: null,
            state: null,
            zipCode: null,
            permissionGroupId: null,
          }}
          onSubmit={handleSubmit}
          onClose={handleShow}
          isLoading={isLoading}
        />
      </Modal>
    </>
  );
};

export default withApollo(AddUser);
