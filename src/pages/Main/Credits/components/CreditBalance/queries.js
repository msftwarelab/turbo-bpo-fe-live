import gql from 'graphql-tag';

export const CREDIT_BALANCE = gql`
  query CreditBalance {
    creditBalance: profile {
      id
      credit
    }
  }
`;

export default {};
