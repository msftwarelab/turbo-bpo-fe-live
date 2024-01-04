import gql from 'graphql-tag';

export const DELETE_HEADER = gql`
  mutation DeleteHeader($id: ID!) {
    deleteHeader(id: $id)
  }
`;
