import gql from 'graphql-tag';

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input)
  }
`;

export default UPDATE_USER;
