import gql from 'graphql-tag';

export const SAVE_COMMENT = gql`
  mutation SAVEComment($input: CommentInput!) {
    saveComment(input: $input)
  }
`;
