import React, { useState } from 'react';
import setErrorMessage from 'utils/setErrorMessage';
import { shape, func } from 'prop-types';
import cogoToast from 'cogo-toast';
import { useMutation } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import UPDATE_REQUEST from 'mutations/updateRequest';
import ALL_REQUEST from 'queries/allRequest';

const Submit = ({ request, filter, onSubmit }) => {
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
            type: request.type,
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
      onSubmit(request);
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

Submit.propTypes = {
  onSubmit: func,
  request: shape({}),
  filter: shape({}),
};

Submit.defaultProps = {
  onSubmit: e => e,
  request: {},
  filter: {},
};

export default Submit;
