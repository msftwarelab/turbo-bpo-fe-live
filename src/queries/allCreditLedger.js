import gql from 'graphql-tag';

const ALL_CREDIT_LEDGER = gql`
  query AllCreditLedger($filter: FilterInput) {
    allCreditLedger(filter: $filter) {
      totalCount
      results {
        id
        clientName
        clientId
        paypalOrderId
        type
        orderNumber
        orderAddress
        createdDateTime
        balance
        iformCharge
        amount
      }
    }
  }
`;

export default ALL_CREDIT_LEDGER;
