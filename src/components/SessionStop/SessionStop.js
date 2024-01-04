import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import { func, string, shape, bool } from 'prop-types';
import { Button } from 'react-bootstrap';
import setErrorMessage from 'utils/setErrorMessage';
import STOP_SESSION from 'mutations/stopSession';
import ALL_SESSION from 'queries/allSession';

const SessionStop = ({ disabled, userId, filter, onStop }) => {
  const [isLoading, setLoading] = useState(false);
  const [stopSession] = useMutation(STOP_SESSION);
  const handleNew = async () => {
    if (!userId) cogoToast.warn('No user selected');
    if (!userId) return;
    setLoading(true);
    try {
      await stopSession({
        variables: { userId },
        refetchQueries: [
          {
            query: ALL_SESSION,
            variables: { filter },
          },
        ],
      });
      cogoToast.success('Session stopped');
      onStop();
      setLoading(false);
    } catch (err) {
      cogoToast.error(setErrorMessage(err));
      setLoading(false);
    }
  };
  return (
    <Button onClick={handleNew} disabled={isLoading || disabled}>
      Stop
    </Button>
  );
};
SessionStop.propTypes = {
  userId: string,
  filter: shape({}),
  disabled: bool,
  onStop: func,
};

SessionStop.defaultProps = {
  onStop: e => e,
  userId: null,
  filter: {},
  disabled: false,
};

export default SessionStop;
