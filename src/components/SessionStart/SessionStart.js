import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import { shape, func, bool } from 'prop-types';
import { Button } from 'react-bootstrap';
import setErrorMessage from 'utils/setErrorMessage';
import SAVE_SESSION from 'mutations/saveSession';
import ALL_SESSION from 'queries/allSession';

const SessionStart = ({ disabled, input, filter, onStart }) => {
  const [isLoading, setLoading] = useState(false);
  const [saveSession] = useMutation(SAVE_SESSION);
  const handleNew = async () => {
    if (!input.userId) cogoToast.warn('No user selected');
    if (!input.invoiceDate) cogoToast.warn('No invoice date selected');
    if (!input.userId || !input.invoiceDate) return;
    setLoading(true);
    try {
      await saveSession({
        variables: input,
        refetchQueries: [
          {
            query: ALL_SESSION,
            variables: { filter },
          },
        ],
      });
      cogoToast.success('Session created');
      onStart();
      setLoading(false);
    } catch (err) {
      cogoToast.error(setErrorMessage(err));
      setLoading(false);
    }
  };
  return (
    <Button onClick={handleNew} disabled={isLoading || disabled}>
      New
    </Button>
  );
};

SessionStart.propTypes = {
  onStart: func,
  input: shape({}),
  filter: shape({}),
  disabled: bool,
};

SessionStart.defaultProps = {
  onStart: e => e,
  input: {},
  disabled: false,
  filter: {},
};

export default SessionStart;
