import gql from 'graphql-tag';

export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    registerUser(input: $input)
  }
`;
