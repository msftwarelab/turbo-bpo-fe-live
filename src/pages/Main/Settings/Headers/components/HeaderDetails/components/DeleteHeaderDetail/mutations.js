import gql from 'graphql-tag';

export const DELETE_HEADER_DETAIL = gql`
  mutation DeleteHeaderDetail($id: ID!) {
    deleteHeader(id: $id)
  }
`;
