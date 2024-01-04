import gql from 'graphql-tag';

export const SAVE_CREDIT = gql`
  mutation SaveCredit($input: SaveCreditInput!) {
    saveCredit(input: $input)
  }
`;
