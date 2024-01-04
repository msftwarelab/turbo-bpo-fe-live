import gql from 'graphql-tag';

const DELETE_BILLING = gql`
  mutation DeleteBilling($id: ID!) {
    deleteBilling(id: $id)
  }
`;

export default DELETE_BILLING;
