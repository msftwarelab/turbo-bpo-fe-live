import gql from 'graphql-tag';

export const UPDATE_HEADER_DETAIL = gql`
  mutation UpdateHeaderDetail($id: ID!, $name: String!) {
    updateHeader(id: $id, name: $name)
  }
`;
