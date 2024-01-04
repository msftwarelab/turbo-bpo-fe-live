import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useMutation } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import { withApollo } from 'react-apollo';
import setErrorMessage from 'utils/setErrorMessage';
import { UPDATE_QUALITY_CONTROL } from './mutations';
import ALL_QUALITY_CONTROL from 'queries/allQualityControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHands } from '@fortawesome/free-solid-svg-icons';
import { useMe } from 'contexts/Me';

const SelfAssignQualityControl = ({ qualityControl, qualityControlFilter }) => {
  const { me } = useMe();
  const [isLoading, setLoading] = useState(false);
  const [assignQualityControl] = useMutation(UPDATE_QUALITY_CONTROL);

  const handleSubmit = async () => {
    try {
      await assignQualityControl({
        variables: {
          id: qualityControl.id,
          input: {
            assignId: me.id,
            assignReason: null,
          },
        },
        refetchQueries: [
          {
            query: ALL_QUALITY_CONTROL,
            variables: { filter: qualityControlFilter },
          },
        ],
      });
      setLoading(false);
      cogoToast.success('QualityControl successfully assigned');
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };
  return (
    <>
      <div>
        <Button
          size="sm"
          onClick={handleSubmit}
          variant="success"
          disabled={isLoading}
        >
          <FontAwesomeIcon icon={faHands} />
        </Button>
      </div>
    </>
  );
};

export default withApollo(SelfAssignQualityControl);
