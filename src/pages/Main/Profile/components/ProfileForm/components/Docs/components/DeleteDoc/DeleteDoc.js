import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import { withApollo } from 'react-apollo';
import { Button } from 'react-bootstrap';
import DeleteModal from 'components/DeleteModal';
import setErrorMessage from 'utils/setErrorMessage';
import { DELETE_PROFILE_DOC } from './mutations';
import { ALL_PROFILE_DOC } from '../DocList/queries';

const DeleteDoc = ({ doc, client, filter }) => {
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleShowModal = () => setShow(!isShow);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const {
        data: { deleteProfileDoc },
      } = await client.mutate({
        mutation: DELETE_PROFILE_DOC,
        variables: {
          id: doc.id,
        },
        refetchQueries: [
          {
            query: ALL_PROFILE_DOC,
            variables: { filter },
          },
        ],
      });
      setLoading(false);
      if (deleteProfileDoc) cogoToast.success('Complete');
      else cogoToast.error(setErrorMessage());
      handleShowModal();
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };

  return (
    <>
      <Button size="sm" variant="primary" onClick={handleShowModal}>
        Delete
      </Button>
      <DeleteModal
        show={isShow}
        isLoading={isLoading}
        onAccept={handleDelete}
        onClose={handleShowModal}
      />
    </>
  );
};

export default withApollo(DeleteDoc);
