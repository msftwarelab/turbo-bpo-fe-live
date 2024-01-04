import gql from 'graphql-tag';

const UPDATE_INVOICE = gql`
  mutation UpdateInvoice($id: ID!, $input: UpdateInvoiceInput!) {
    updateInvoice(id: $id, input: $input)
  }
`;

export default UPDATE_INVOICE;
