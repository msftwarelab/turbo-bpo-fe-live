import gql from 'graphql-tag';

export const SET_COMMENT_DEFAULT = gql`
  mutation SetCommentDefault {
    setCommentDefault
  }
`;
