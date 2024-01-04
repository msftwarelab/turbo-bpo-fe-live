import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { bool, string, shape, arrayOf } from 'prop-types';
import cogoToast from 'cogo-toast';
import { useMutation } from '@apollo/react-hooks';
import setErrorMessage from 'utils/setErrorMessage';
import SUBMIT_PIPELINE_PHOTO from 'mutations/submitPipelinePhoto';
import ALL_PIPELINE_PHOTO from 'queries/allPipelinePhoto';

const PipelinePhotoAllSubmitSwitch = ({
  pipelinePhotos,
  pipelineId,
  isSubmitted,
  label = '',
  filter,
  isSwitchLoading,
  handleSwitch,
}) => {
  const [isPhotoSubmitted, setPhotoSubmitted] = useState(isSubmitted);
  useEffect(() => {
    setPhotoSubmitted(isSubmitted);
  }, [isSubmitted]);
  const [updatePipelinePhoto] = useMutation(SUBMIT_PIPELINE_PHOTO);
  const handleChange = async () => {
    handleSwitch(true);
    try {
      await Promise.all(
        pipelinePhotos.map(photos => {
          return updatePipelinePhoto({
            variables: {
              id: photos.id,
              IsSubmitPipelinePhoto: !isPhotoSubmitted,
            },
            refetchQueries: [
              {
                query: ALL_PIPELINE_PHOTO,
                variables: { pipelineId, filter },
              },
            ],
          });
        })
      );
      cogoToast.success('Complete');
      setPhotoSubmitted(!isPhotoSubmitted);
      handleSwitch(false);
    } catch (err) {
      cogoToast.error(setErrorMessage(err));
      handleSwitch(false);
    }
  };
  return (
    <Form.Check
      type="switch"
      id="switch-all"
      disabled={isSwitchLoading}
      onChange={handleChange}
      checked={isPhotoSubmitted}
      label={label}
    />
  );
};

PipelinePhotoAllSubmitSwitch.propTypes = {
  isSubmitted: bool,
  pipelinePhotos: arrayOf(shape({})),
  pipelineId: string,
  label: string,
  filter: shape({}),
};

PipelinePhotoAllSubmitSwitch.defaultProps = {
  isSubmitted: false,
  pipelinePhotos: [],
  pipelineId: null,
  label: '',
  filter: {},
};

export default PipelinePhotoAllSubmitSwitch;
