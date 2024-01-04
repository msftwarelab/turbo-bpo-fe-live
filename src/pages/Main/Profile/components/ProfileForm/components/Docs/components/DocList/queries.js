import gql from 'graphql-tag';

export const ALL_PROFILE_DOC = gql`
  query AllProfileDoc($filter: FilterInput) {
    allProfileDoc(filter: $filter) {
      totalCount
      results {
        id
        type
        fileName
        url
        createdDateTime
      }
    }
  }
`;

export default {};
