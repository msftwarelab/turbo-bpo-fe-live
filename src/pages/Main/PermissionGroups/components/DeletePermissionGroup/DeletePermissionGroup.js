import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import { useMutation } from '@apollo/react-hooks';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from 'components/DeleteModal';
import setErrorMessage from 'utils/setErrorMessage';
import DELETE_PERMISSION_GROUP from 'mutations/deletePermissionGroup';
import ALL_PERMISSION_GROUP from 'queries/allPermissionGroup';

const DeletePermissionGroup = ({ permissionGroup, filter }) => {
  const [deletePermissionGroup] = useMutation(DELETE_PERMISSION_GROUP);
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleShow = () => setShow(!isShow);

  const handleDelete = async () => {
    setLoading(true);
    try {
      deletePermissionGroup({
        variables: {
          id: permissionGroup.id,
        },
        refetchQueries: [
          {
            query: ALL_PERMISSION_GROUP,
            variables: { filter },
          },
        ],
      });
      setLoading(false);
      cogoToast.success('Permission group successfully deleted');
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

export default DeletePermissionGroup;
