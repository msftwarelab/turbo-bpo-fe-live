import gql from 'graphql-tag';

export const UPDATE_COMMENT = gql`
  mutation UpdateComment($id: ID!, $value: String!) {
    updateComment(id: $id, value: $value)
  }
`;
