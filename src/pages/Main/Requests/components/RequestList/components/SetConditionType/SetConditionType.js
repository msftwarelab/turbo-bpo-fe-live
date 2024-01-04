import React, { useState } from 'react';
import setErrorMessage from 'utils/setErrorMessage';
import { useMutation } from '@apollo/react-hooks';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import UPDATE_REQUEST from 'mutations/updateRequest';
import cogoToast from 'cogo-toast';
import ALL_REQUEST from 'queries/allRequest';

const SetConditionType = ({ request, filter }) => {
  const [isLoading, setLoading] = useState(false);
  const [updateRequest] = useMutation(UPDATE_REQUEST);
  const handleSubmit = async () => {
    if (!request.conditionType) {
      cogoToast.warn('Condition type is required');
      return;
    }
    setLoading(true);
    try {
      await updateRequest({
        variables: {
          id: request.id,
          input: {
            conditionType: request.conditionType,
          },
        },
        refetchQueries: [
          {
            query: ALL_REQUEST,
            variables: { filter },
          },
        ],
      });
      setLoading(false);
      cogoToast.success('Request updated');
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };

  return (
    <Button
      variant="success"
      onClick={handleSubmit}
      size="sm"
      disabled={isLoading}
    >
      <FontAwesomeIcon icon={faCheck} />
    </Button>
  );
};

export default SetConditionType;
