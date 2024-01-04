import gql from 'graphql-tag';

const ALL_USER_EMAIL = gql`
  query AllUser($filter: UserFilterInput) {
    allUser(filter: $filter) {
      totalCount
      results {
        id
        email
      }
    }
  }
`;

export default ALL_USER_EMAIL;
