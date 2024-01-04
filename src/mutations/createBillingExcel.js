import gql from 'graphql-tag';

const CREATE_BILLING_EXCEL = gql`
  mutation CreateBillingExcel($id: String!) {
    createBillingExcel(id: $id)
  }
`;

export default CREATE_BILLING_EXCEL;
