import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import { useMutation } from '@apollo/react-hooks';
import { Button, Modal } from 'react-bootstrap';
import removeNull from 'utils/removeNull';
import setErrorMessage from 'utils/setErrorMessage';
import removeTypeName from 'utils/removeTypeName';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import PermissionGroupForm from '../PermissionGroupForm';
import UPDATE_PERMISSION_GROUP from 'mutations/updatePermissionGroup';
import ALL_PERMISSION_GROUP from 'queries/allPermissionGroup';

const EditPermissionGroup = ({ permissionGroup, filter }) => {
  const [updatePermissionGroup] = useMutation(UPDATE_PERMISSION_GROUP);
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleShow = () => setShow(!isShow);

  const handleSubmit = async data => {
    setLoading(true);
    const input = { ...removeNull(data) };
    delete input.id;
    try {
      updatePermissionGroup({
        variables: {
          id: permissionGroup.id,
          input,
        },
        refetchQueries: [
          {
            query: ALL_PERMISSION_GROUP,
            variables: { filter },
          },
        ],
      });
      setLoading(false);
      cogoToast.success('Permission updated');
      handleShow();
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
      handleShow();
    }
  };

  const initialValues = removeTypeName(permissionGroup);

  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>
        <FontAwesomeIcon icon={faEdit} />
      </Button>
      <Modal show={isShow} onHide={handleShow} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Edit Permission</Modal.Title>
        </Modal.Header>
        <PermissionGroupForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onClose={handleShow}
          isLoading={isLoading}
        />
      </Modal>
    </>
  );
};

export default EditPermissionGroup;
