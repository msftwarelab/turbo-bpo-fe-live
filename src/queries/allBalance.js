import gql from 'graphql-tag';

const ALL_BALANCE = gql`
  query AllBalance($filter: BalanceFilterInput ) {
    allBalance(filter: $filter) {
       totalCount,
       results{
         client
         total
         paidAmount
         other
         unpaid
       }
     }
  }
`;

export default ALL_BALANCE;
