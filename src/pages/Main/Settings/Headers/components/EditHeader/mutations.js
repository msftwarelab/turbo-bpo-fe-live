import gql from 'graphql-tag';

export const UPDATE_HEADER = gql`
  mutation UpdateHeader($id: ID!, $name: String!) {
    updateHeader(id: $id, name: $name)
  }
`;
