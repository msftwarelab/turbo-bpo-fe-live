import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import { shape, func } from 'prop-types';
import { Button } from 'react-bootstrap';
import setErrorMessage from 'utils/setErrorMessage';
import ALL_QC_REQUEST from 'queries/allQcRequest';
import UPDATE_QUALITY_CONTROL from 'mutations/updateQualityControl';

const QualityControlCancel = ({ qualityControl, filter, onAccept }) => {
  const [isLoading, setLoading] = useState(false);
  const [updateQualityControl] = useMutation(UPDATE_QUALITY_CONTROL);
  const handleClick = async () => {
    setLoading(true);
    try {
      await updateQualityControl({
        variables: {
          id: qualityControl.qcId,
          input: { status: 'COMPLETE' },
        },
        refetchQueries: [
          {
            query: ALL_QC_REQUEST,
            variables: { filter },
          },
        ],
      });
      onAccept();
      cogoToast.success('Quality control updated');
      setLoading(false);
    } catch (err) {
      cogoToast.error(setErrorMessage(err));
      setLoading(false);
    }
  };
  return (
    <Button onClick={handleClick} disabled={isLoading}>
      Accept
    </Button>
  );
};

QualityControlCancel.defaultProps = {
  qualityControl: {},
  filter: {},
  onAccept: func,
};

QualityControlCancel.propTypes = {
  qualityControl: shape({}),
  filter: shape({}),
  onAccept: e => e,
};

export default QualityControlCancel;
