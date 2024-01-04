import gql from 'graphql-tag';

const UPDATE_BILLING = gql`
  mutation UpdateBilling($id: ID!, $input: UpdateBillingInput!) {
    updateBilling(id: $id, input: $input)
  }
`;

export default UPDATE_BILLING;
