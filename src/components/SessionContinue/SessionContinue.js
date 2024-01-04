import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import { func, string, shape, bool } from 'prop-types';
import { Button } from 'react-bootstrap';
import setErrorMessage from 'utils/setErrorMessage';
import CONTINUE_SESSION from 'mutations/continueSession';
import ALL_SESSION from 'queries/allSession';

const SessionContinue = ({ disabled, userId, filter, onContinue }) => {
  const [isLoading, setLoading] = useState(false);
  const [continueSession] = useMutation(CONTINUE_SESSION);
  const handleContinue = async () => {
    if (!userId) cogoToast.warn('No user selected');
    if (!userId) return;
    setLoading(true);
    try {
      await continueSession({
        variables: { userId },
        refetchQueries: [
          {
            query: ALL_SESSION,
            variables: { filter },
          },
        ],
      });
      cogoToast.success('Session continue');
      onContinue();
      setLoading(false);
    } catch (err) {
      cogoToast.error(setErrorMessage(err));
      setLoading(false);
    }
  };
  return (
    <Button onClick={handleContinue} disabled={isLoading || disabled}>
      Continue
    </Button>
  );
};
SessionContinue.propTypes = {
  userId: string,
  filter: shape({}),
  disabled: bool,
  onContinue: func,
};

SessionContinue.defaultProps = {
  onContinue: e => e,
  userId: null,
  filter: {},
  disabled: false,
};

export default SessionContinue;
