import gql from 'graphql-tag';

export const ALL_COMMENT = gql`
  query AllComment($userId: ID) {
    allComment(userId: $userId) {
      id
      category
      label
      value
      createdDateTime
    }
  }
`;

export default {};
