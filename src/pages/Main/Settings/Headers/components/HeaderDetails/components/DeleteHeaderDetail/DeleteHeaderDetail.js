import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import { withApollo } from 'react-apollo';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from 'components/DeleteModal';
import setErrorMessage from 'utils/setErrorMessage';
import { DELETE_HEADER_DETAIL } from './mutations';
import { ALL_HEADER_DETAIL } from '../HeaderDetailList/queries';

const DeleteHeaderDetail = ({ header, parentId, client, filter }) => {
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleShow = () => setShow(!isShow);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const {
        data: { deleteHeader },
      } = await client.mutate({
        mutation: DELETE_HEADER_DETAIL,
        variables: {
          id: header.id,
        },
        refetchQueries: [
          {
            query: ALL_HEADER_DETAIL,
            variables: { filter, parentId },
          },
        ],
      });
      setLoading(false);
      if (deleteHeader) cogoToast.success('Header successfully deleted');
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

export default withApollo(DeleteHeaderDetail);
