import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ConfirmModal from 'components/ConfirmModal';
import { UNHOLD_QUALITY_CONTROL } from './mutations';
import cogoToast from 'cogo-toast';
import { useMutation } from '@apollo/react-hooks';
import setErrorMessage from 'utils/setErrorMessage';
import ALL_QUALITY_CONTROL from 'queries/allQualityControl';

const UnholdQualityControl = ({
  qualityControl,
  className,
  filter,
  onUnhold = e => e,
}) => {
  const [unholdQualityControl] = useMutation(UNHOLD_QUALITY_CONTROL);
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const handleShow = () => setShow(!isShow);
  const handleSubmit = async () => {
    try {
      await unholdQualityControl({
        variables: {
          id: qualityControl.id,
          input: {
            status: 'ACTIVE',
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
      onUnhold();
      cogoToast.success('QualityControl unhold');
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };
  return (
    <>
      <Button className={className} variant="primary" onClick={handleShow}>
        Unhold
      </Button>
      {isShow && (
        <ConfirmModal
          show
          title="Unhold quality control"
          description="Are you sure you want to unhold quality control?"
          onAccept={handleSubmit}
          onClose={handleShow}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default UnholdQualityControl;
