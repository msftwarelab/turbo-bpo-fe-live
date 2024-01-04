import gql from 'graphql-tag';

export const DELETE_PROFILE_DOC = gql`
  mutation DeleteProfileDoc($id: ID!) {
    deleteProfileDoc(id: $id)
  }
`;
