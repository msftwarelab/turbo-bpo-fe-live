import gql from 'graphql-tag';

const ALL_USER = gql`
  query AllUser($filter: UserFilterInput) {
    allUser(filter: $filter) {
      totalCount
      results {
        id
        firstName
        lastName
        address
        city
        roles
        orderTotal
        assignmentPercentage
      }
    }
  }
`;

export { ALL_USER };
