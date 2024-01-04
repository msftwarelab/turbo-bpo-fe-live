import React, { useState } from 'react';
import setErrorMessage from 'utils/setErrorMessage';
import cogoToast from 'cogo-toast';
import { useMutation } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import UPDATE_REQUEST from 'mutations/updateRequest';
import ALL_REQUEST from 'queries/allRequest';

const SetAction = ({ request, filter, onUpdateAction }) => {
  const [isLoading, setLoading] = useState(false);
  const [updateRequest] = useMutation(UPDATE_REQUEST);
  const handleSubmit = async () => {
    if (!request.action) {
      cogoToast.warn('Action is required');
      return;
    }
    setLoading(true);
    try {
      await updateRequest({
        variables: {
          id: request.id,
          input: {
            action: request.action,
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
      onUpdateAction(request);
      cogoToast.success('Request updated');
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };

  return (
    <>
      <Button
        onClick={handleSubmit}
        disabled={isLoading}
        variant="success"
        size="sm"
      >
        <FontAwesomeIcon icon={faCheck} />
      </Button>
    </>
  );
};

export default SetAction;
