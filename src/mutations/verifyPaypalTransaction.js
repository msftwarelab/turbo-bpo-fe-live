import gql from 'graphql-tag';

const VERIFY_PAYPAL_TRANSACTION = gql`
  mutation VerifyPaypalTransaction($paypalOrderId: String!, $billingId: ID) {
    verifyPaypalTransaction(
      paypalOrderId: $paypalOrderId
      billingId: $billingId
    )
  }
`;

export default VERIFY_PAYPAL_TRANSACTION;
