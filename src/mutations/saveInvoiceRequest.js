import gql from 'graphql-tag';

const SAVE_INVOICE_REQUEST = gql`
  mutation SaveInvoice($input: SaveInvoiceInput!) {
    saveInvoice(input: $input)
  }
`;

export default SAVE_INVOICE_REQUEST;
