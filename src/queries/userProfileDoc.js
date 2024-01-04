import gql from 'graphql-tag';

const USER_PROFILE_DOC = gql`
  query UserProfileDoc($id: ID) {
    allProfileDoc(userId: $id) {
      totalCount
      results {
        type
        fileName
        url
      }
    }
  }
`;

export default USER_PROFILE_DOC;
