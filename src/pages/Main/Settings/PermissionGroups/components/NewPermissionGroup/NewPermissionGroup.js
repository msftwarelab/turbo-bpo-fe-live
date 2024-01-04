import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import SAVE_PERMISSION_GROUP from 'mutations/savePermissionGroup';
import ALL_PERMISSION_GROUP from 'queries/allPermissionGroup';
import PermissionGroupForm from '../PermissionGroupForm';
import ME from 'queries/me';

const NewPermissionGroup = ({ filter = {} }) => {
  const [savePermissionGroup] = useMutation(SAVE_PERMISSION_GROUP);
  const [isLoading, setLoading] = useState(false);
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);

  const handleSubmit = async input => {
    setLoading(true);
    try {
      await savePermissionGroup({
        variables: {
          input,
        },
        refetchQueries: [
          {
            query: ALL_PERMISSION_GROUP,
            variables: { filter },
          },
          {
            query: ME,
          },
        ],
      });
      setLoading(false);
      cogoToast.success('Permission group created');
      handleShow();
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
      handleShow();
    }
  };
  return (
    <>
      <Button onClick={handleShow} variant="warning">
        Add Permission
      </Button>
      {isShow && (
        <Modal show={isShow} onHide={handleShow} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>New Permission</Modal.Title>
          </Modal.Header>
          <PermissionGroupForm
            form="permissionGroupForm"
            initialValues={{
              name: null,
              permissions: [],
            }}
            onSubmit={handleSubmit}
            onClose={handleShow}
            isLoading={isLoading}
          />
        </Modal>
      )}
    </>
  );
};

export default NewPermissionGroup;
