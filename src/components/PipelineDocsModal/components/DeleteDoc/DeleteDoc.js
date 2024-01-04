import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import { withApollo } from 'react-apollo';
import { Button } from 'react-bootstrap';
import DeleteModal from 'components/DeleteModal';
import setErrorMessage from 'utils/setErrorMessage';
import { DELETE_PIPELINE_DOC } from './mutations';
import ALL_PIPELINE from 'queries/allPipeline';
import ALL_PIPELINE_DOC from 'queries/allPipelineDoc';

const DeleteDoc = ({ doc, client, filter, pipelineFilter, pipelineId }) => {
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleShowModal = () => setShow(!isShow);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const {
        data: { deletePipelineDoc },
      } = await client.mutate({
        mutation: DELETE_PIPELINE_DOC,
        variables: {
          id: doc.id,
        },
        refetchQueries: [
          {
            query: ALL_PIPELINE,
            variables: { filter: pipelineFilter },
          },
          {
            query: ALL_PIPELINE_DOC,
            variables: { pipelineId, filter },
          },
        ],
      });
      setLoading(false);
      if (deletePipelineDoc) cogoToast.success('Complete');
      else cogoToast.error(setErrorMessage());
      handleShowModal();
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };

  return (
    <>
      <Button size="sm" variant="danger" onClick={handleShowModal}>
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
