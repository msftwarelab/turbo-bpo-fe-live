import gql from 'graphql-tag';

const ALL_INVOICE_REQUEST = gql`
  query AllInvoiceRequest($filter: InvoiceRequestFilterInput) {
    allInvoiceRequest(filter: $filter) {
      totalCount
      results {
        id
        type
        name
        employeeId
        date
        orderNumber
        address
        company
        client
        orderType
        qcType
        isSuperRush
        isRush
        isInterior
        isRentalAddendum
        isInitialBpo
        isInspection
        isNoCsv
        isNoIFill
        isOtherPremium
      }
    }
  }
`;

export default ALL_INVOICE_REQUEST;
