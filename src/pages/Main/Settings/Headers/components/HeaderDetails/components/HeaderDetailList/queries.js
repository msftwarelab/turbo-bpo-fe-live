import gql from 'graphql-tag';

export const ALL_HEADER_DETAIL = gql`
  query AllHeaderDetail($parentId: ID!, $filter: HeaderFilterInput) {
    allHeaderDetail(parentId: $parentId, filter: $filter) {
      totalCount
      results {
        id
        name
      }
    }
  }
`;

export default {};
