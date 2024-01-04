import React from 'react';
import { Modal } from 'react-bootstrap';
import { useMutation } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import removeNull from 'utils/removeNull';
import { shape, string, number, func, bool } from 'prop-types';
import setErrorMessage from 'utils/setErrorMessage';
import { PayPalButton } from 'react-paypal-button-v2';
import VERIFY_PAYPAL_TRANSACTION from 'mutations/verifyPaypalTransaction';
import ALL_BILLING from 'queries/allBilling';

const PaymentModal = ({
  show,
  billingId,
  amount,
  filter,
  onHide,
  onSuccess,
}) => {
  const [verifyPaypalTransaction] = useMutation(VERIFY_PAYPAL_TRANSACTION);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Payment</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <PayPalButton
          amount={parseFloat(amount.toFixed(2), 2)}
          onSuccess={async (_, data) => {
            try {
              await verifyPaypalTransaction({
                variables: removeNull({
                  paypalOrderId: data.orderID,
                  billingId,
                }),
                refetchQueries: [
                  {
                    query: ALL_BILLING,
                    variables: { filter },
                  },
                ],
              });

              cogoToast.success('Transaction completed');
              onSuccess();
            } catch (e) {
              cogoToast.error(setErrorMessage(e));
            }
          }}
          options={{
            clientId:
              'AaNhJKIMAAzkrzSNHLRQemf3tGQu23BhD6xA0WnMBtaCMCylJduFmAwl7rWt88JkPm-hPR2goZfNriKN',
          }}
        />
      </Modal.Body>
    </Modal>
  );
};

PaymentModal.propTypes = {
  filter: shape({}),
  billingId: string,
  amount: number,
  show: bool,
  onHide: func,
  onSuccess: func,
};

PaymentModal.defaultProps = {
  filter: {},
  billingId: null,
  amount: null,
  onHide: e => e,
  onSuccess: e => e,
  show: false,
};

export default PaymentModal;
