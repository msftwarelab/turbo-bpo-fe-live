import gql from 'graphql-tag';

const SAVE_BILLING = gql`
  mutation SaveBilling($input: SaveBillingInput!) {
    saveBilling(input: $input)
  }
`;

export default SAVE_BILLING;
