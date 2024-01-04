import gql from 'graphql-tag';

export const ALL_HEADER = gql`
  query AllHeader($filter: HeaderFilterInput) {
    allHeader(filter: $filter) {
      totalCount
      results {
        id
        name
      }
    }
  }
`;

export default {};
