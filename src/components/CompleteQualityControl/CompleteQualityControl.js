import React, { useState } from 'react';
import { shape, string, func } from 'prop-types';
import { Button } from 'react-bootstrap';
import removeNull from 'utils/removeNull';
import SAVE_QUALITY_CONTROL_AND_NOTE from 'mutations/savePipelineQualityControlAndNote';
import cogoToast from 'cogo-toast';
import { useMutation } from '@apollo/react-hooks';
import setErrorMessage from 'utils/setErrorMessage';
import ALL_QUALITY_CONTROL_AND_NOTE from 'queries/allPipelineQualityControlAndNote';
import ALL_QUALITY_CONTROL from 'queries/allQualityControl';

const CompleteQualityControl = ({
  message,
  requestType,
  pipelineId,
  qualityControlId,
  onComplete,
  className,
  filter,
  qualityControlAndNoteFilter,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [savePipelineQualityControlAndNote] = useMutation(
    SAVE_QUALITY_CONTROL_AND_NOTE
  );
  const handleSubmit = async () => {
    try {
      await savePipelineQualityControlAndNote({
        variables: {
          pipelineId,
          input: removeNull({
            qualityControlId,
            message,
            requestType,
            category: 'QUALITY_CONTROL',
            status: 'COMPLETE',
          }),
        },
        refetchQueries: [
          {
            query: ALL_QUALITY_CONTROL_AND_NOTE,
            variables: { pipelineId, filter: qualityControlAndNoteFilter },
          },
          {
            query: ALL_QUALITY_CONTROL,
            variables: { pipelineId, filter },
          },
        ],
      });
      setLoading(false);
      await onComplete();
      cogoToast.success('QualityControl');
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };
  return (
    <Button
      className={className}
      variant="warning"
      onClick={handleSubmit}
      disabled={isLoading}
    >
      Complete
    </Button>
  );
};

CompleteQualityControl.propTypes = {
  pipelineId: string,
  filter: shape({}),
  className: string,
  qualityControlId: string,
  message: string,
  requestType: string,
  onComplete: func,
  qualityControlAndNoteFilter: shape({}),
};

CompleteQualityControl.defaultProps = {
  pipelineId: null,
  filter: {},
  className: '',
  qualityControlId: null,
  onComplete: e => e,
  message: null,
  requestType: null,
  qualityControlAndNoteFilter: {},
};

export default CompleteQualityControl;
