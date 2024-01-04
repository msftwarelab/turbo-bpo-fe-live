import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { bool, string, shape } from 'prop-types';
import cogoToast from 'cogo-toast';
import { useMutation } from '@apollo/react-hooks';
import setErrorMessage from 'utils/setErrorMessage';
import SUBMIT_PIPELINE_PHOTO from 'mutations/submitPipelinePhoto';
import ALL_PIPELINE_PHOTO from 'queries/allPipelinePhoto';

const PipelinePhotoSubmitSwitch = ({
  pipelinePhotoId,
  pipelineId,
  isSubmitted,
  filter,
  isSwitchLoading,
  handleSwitch,
}) => {
  const [IsSubmitPipelinePhoto, setSubmitPipelinePhoto] = useState(isSubmitted);
  useEffect(() => {
    setSubmitPipelinePhoto(isSubmitted);
  }, [isSubmitted]);
  const [updatePipelinePhoto] = useMutation(SUBMIT_PIPELINE_PHOTO);
  const handleChange = async () => {
    handleSwitch(true);
    try {
      setSubmitPipelinePhoto(!isSubmitted);
      await updatePipelinePhoto({
        variables: {
          id: pipelinePhotoId,
          IsSubmitPipelinePhoto: !isSubmitted,
        },
        refetchQueries: [
          {
            query: ALL_PIPELINE_PHOTO,
            variables: { pipelineId, filter },
          },
        ],
      });
      cogoToast.success('Complete');
      handleSwitch(false);
    } catch (err) {
      setSubmitPipelinePhoto(isSubmitted);
      cogoToast.error(setErrorMessage(err));
      handleSwitch(false);
    }
  };
  return (
    <Form.Check
      type="switch"
      id={`switch-${pipelinePhotoId}`}
      disabled={isSwitchLoading}
      onChange={handleChange}
      checked={IsSubmitPipelinePhoto}
      label={IsSubmitPipelinePhoto ? 'YES' : 'NO'}
    />
  );
};

PipelinePhotoSubmitSwitch.propTypes = {
  isSubmitted: bool,
  pipelinePhotoId: string,
  pipelineId: string,
  filter: shape({}),
};

PipelinePhotoSubmitSwitch.defaultProps = {
  isSubmitted: false,
  pipelinePhotoId: null,
  pipelineId: null,
  filter: {},
};

export default PipelinePhotoSubmitSwitch;
