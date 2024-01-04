import gql from 'graphql-tag';

const ALL_BILLING = gql`
  query AllBilling($filter: BillingFilterInput) {
    allBilling(filter: $filter) {
      totalCount
      results {
        id
        invoiceNumber
        status
        date
        dateFrom
        dateTo
        dueDate
        userId
        userName
        entries {
          orderNumber
          description
          amount
          type
        }
      }
    }
  }
`;

export default ALL_BILLING;
