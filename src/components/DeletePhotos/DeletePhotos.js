import React, { useState } from 'react';
import gql from 'graphql-tag';
import setErrorMessage from 'utils/setErrorMessage';
import { withApollo } from 'react-apollo';
import cogoToast from 'cogo-toast';
import ALL_PIPELINE_PHOTO from 'queries/allPipelinePhoto';
import ALL_PIPELINE from 'queries/allPipeline';
import { Button } from 'react-bootstrap';

const graphqlString = ({ photoId }) =>
  `photo_${photoId}: deletePipelinePhoto(id: "${photoId}")`;

const DeletePhotos = ({
  pipelineId = null,
  selectedPhotos = [],
  client = {},
  pipelinePhotoFilter = {},
  pipelineFilter = {},
  onDelete = e => e,
}) => {
  const [isLoading, setLoading] = useState(false);
  const handleDelete = async () => {
    if (!selectedPhotos.length) {
      cogoToast.warn('No photos selected');
      return;
    }
    setLoading(true);
    try {
      let str = '';
      selectedPhotos.map(photo => {
        str += graphqlString({
          photoId: photo.id,
        });
        return false;
      });

      await client.mutate({
        mutation: gql(`mutation { ${str} }`),
        refetchQueries: [
          {
            query: ALL_PIPELINE_PHOTO,
            variables: { pipelineId, filter: pipelinePhotoFilter },
          },
          {
            query: ALL_PIPELINE,
            variables: { filter: pipelineFilter },
          },
        ],
      });
      cogoToast.success('Photos deleted');
      setLoading(false);
      onDelete();
    } catch (err) {
      cogoToast.error(setErrorMessage(err));
      setLoading(false);
    }
  };
  return (
    <>
      <Button onClick={handleDelete} disabled={isLoading}>
        Delete
      </Button>
    </>
  );
};

export default withApollo(DeletePhotos);
