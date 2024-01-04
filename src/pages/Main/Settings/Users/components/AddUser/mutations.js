import gql from 'graphql-tag';

export const SAVE_USER = gql`
  mutation SaveUser($input: SaveUserInput!) {
    saveUser(input: $input)
  }
`;
