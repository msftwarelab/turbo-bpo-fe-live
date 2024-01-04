import gql from 'graphql-tag';

const CANCEL_INVOICE = gql`
  mutation CancelInvoice($id: ID!, $reason: String) {
    cancelInvoice(id: $id, reason: $reason)
  }
`;

export default CANCEL_INVOICE;
