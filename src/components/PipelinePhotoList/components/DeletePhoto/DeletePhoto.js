import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import { withApollo } from 'react-apollo';
import { Button } from 'react-bootstrap';
import DeleteModal from 'components/DeleteModal';
import setErrorMessage from 'utils/setErrorMessage';
import ALL_PIPELINE from 'queries/allPipeline';
import ALL_PIPELINE_PHOTO from 'queries/allPipelinePhoto';
import { shape, func, string } from 'prop-types';
import { DELETE_PIPELINE_PHOTO } from './mutations';

const DeletePhoto = ({
  photo,
  client,
  filter,
  pipelineFilter,
  pipelineId,
  onDelete = e => e,
}) => {
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleShowModal = () => setShow(!isShow);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const {
        data: { deletePipelinePhoto },
      } = await client.mutate({
        mutation: DELETE_PIPELINE_PHOTO,
        variables: {
          id: photo.id,
        },
        refetchQueries: [
          {
            query: ALL_PIPELINE,
            variables: { filter: pipelineFilter },
          },
          {
            query: ALL_PIPELINE_PHOTO,
            variables: { pipelineId, filter },
          },
        ],
      });
      setLoading(false);
      if (deletePipelinePhoto) cogoToast.success('Complete');
      else cogoToast.error(setErrorMessage());
      handleShowModal();
      onDelete(photo.id);
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

DeletePhoto.propTypes = {
  photo: shape({}),
  client: shape({}),
  filter: shape({}),
  pipelineFilter: shape({}),
  pipelineId: string,
  onDelete: func,
};

DeletePhoto.defaultProps = {
  photo: {},
  client: {},
  filter: {},
  pipelineFilter: {},
  pipelineId: null,
  onDelete: e => e,
};

export default withApollo(DeletePhoto);
