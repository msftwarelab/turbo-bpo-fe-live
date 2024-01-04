import gql from 'graphql-tag';

const ALL_INVOICE_REQUEST_HISTORY = gql`
  query AllInvoiceRequestHistory($filter: FilterInput) {
    allInvoiceRequestHistory(filter: $filter) {
      totalCount
      results {
        id
        dateRequested
        orderNumber
        address
        company
        remarks
        status
      }
    }
  }
`;

export default ALL_INVOICE_REQUEST_HISTORY;
