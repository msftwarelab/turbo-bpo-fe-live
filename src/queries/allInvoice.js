import gql from 'graphql-tag';

const ALL_INVOICE = gql`
  query AllInvoice($filter: InvoiceFilterInput) {
    allInvoice(filter: $filter) {
      id
      employeeId
      type
      name
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
`;

export default ALL_INVOICE;
