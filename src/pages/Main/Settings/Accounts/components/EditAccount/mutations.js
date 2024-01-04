import gql from 'graphql-tag';

export const UPDATE_ACCOUNT = gql`
  mutation UpdateAccount($id: ID!, $input: AccountInput!) {
    updateAccount(id: $id, input: $input)
  }
`;
