import gql from 'graphql-tag';

export const ALL_PASSWORDS = gql`
  query AllPasswords($filter: AccountFilterInput) {
    allAccount(filter: $filter) {
      totalCount
      results {
        id
        company
        webSite
        username
        password
      }
    }
  }
`;

export default {};
