import gql from 'graphql-tag';

export const SAVE_ACCOUNT = gql`
  mutation SaveAccount($input: AccountInput!) {
    saveAccount(input: $input)
  }
`;
