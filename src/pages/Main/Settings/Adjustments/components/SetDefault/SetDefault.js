import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import { withApollo } from 'react-apollo';
import { Button } from 'react-bootstrap';
import ConfirmModal from 'components/ConfirmModal';
import { SET_ADJUSTMENT_DEFAULT } from './mutations';
import { ALL_ADJUSTMENT } from '../../queries';

const SetDefault = ({ client }) => {
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleShow = () => setShow(!isShow);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const {
        data: { setAdjustmentDefault },
      } = await client.mutate({
        mutation: SET_ADJUSTMENT_DEFAULT,
        variables: {},
        refetchQueries: [
          {
            query: ALL_ADJUSTMENT,
          },
        ],
      });
      setLoading(false);
      if (setAdjustmentDefault)
        cogoToast.success('Adjustments are now back to default');
      else cogoToast.error(setErrorMessage());
      handleShow();
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Default
      </Button>
      <ConfirmModal
        show={isShow}
        onClose={handleShow}
        onAccept={handleSubmit}
        isLoading={isLoading}
        title="WARNING!"
        description="This action will RESET all categories and adjustments. This action cannot be reversed. Do you wish to continue?"
      />
    </>
  );
};

export default withApollo(SetDefault);
