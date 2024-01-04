import gql from 'graphql-tag';

const USER_COMMENT = gql`
  query UserComment($id: ID) {
    allComment(userId: $id) {
      id
      category
      value
    }
  }
`;

export default USER_COMMENT;
