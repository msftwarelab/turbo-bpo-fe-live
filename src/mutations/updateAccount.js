import gql from 'graphql-tag';

const UPDATE_ACCOUNT = gql`
  mutation UpdateAccount($id: ID!, $input: AccountInput!) {
    updateAccount(id: $id, input: $input)
  }
`;

export default UPDATE_ACCOUNT;
