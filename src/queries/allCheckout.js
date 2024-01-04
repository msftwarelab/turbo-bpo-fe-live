import gql from 'graphql-tag';

const ALL_CHECKOUT= gql`
  query AllCheckout($filter: CheckoutFilterInput) {
     allCheckout(filter: $filter) {
      totalCount,
       results {
        clientName
        invoice
        total
        status
        date
        url
      }
    }
  }
`;

export default ALL_CHECKOUT;
