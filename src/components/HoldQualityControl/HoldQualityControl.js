import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ConfirmModal from 'components/ConfirmModal';
import { HOLD_QUALITY_CONTROL } from './mutations';
import cogoToast from 'cogo-toast';
import { useMutation } from '@apollo/react-hooks';
import setErrorMessage from 'utils/setErrorMessage';
import ALL_QUALITY_CONTROL from 'queries/allQualityControl';

const HoldQualityControl = ({
  qualityControl,
  className,
  filter,
  onHold = e => e,
}) => {
  const [holdQualityControl] = useMutation(HOLD_QUALITY_CONTROL);
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const handleShow = () => setShow(!isShow);
  const handleSubmit = async () => {
    try {
      await holdQualityControl({
        variables: {
          id: qualityControl.id,
          input: {
            status: 'HOLD',
          },
        },
        refetchQueries: [
          {
            query: ALL_QUALITY_CONTROL,
            variables: { filter },
          },
        ],
      });
      setLoading(false);
      handleShow();
      onHold();
      cogoToast.success('QualityControl hold');
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };
  return (
    <>
      <Button className={className} variant="primary" onClick={handleShow}>
        Hold
      </Button>
      {isShow && (
        <ConfirmModal
          show
          title="Hold quality control"
          description="Are you sure you want to hold quality control?"
          onAccept={handleSubmit}
          onClose={handleShow}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default HoldQualityControl;
