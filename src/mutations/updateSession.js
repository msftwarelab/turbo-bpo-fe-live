import gql from 'graphql-tag';

const UPDATE_SESSION = gql`
  mutation UpdateSession($id: ID!, $input: UpdateSessionInput!) {
    updateSession(id: $id, input: $input)
  }
`;

export default UPDATE_SESSION;
