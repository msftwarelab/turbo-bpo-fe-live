import gql from 'graphql-tag';

const ADD_CREDIT_LEDGER = gql`
  mutation AddCreditLedger($input: AddCreditLedgerInput!) {
    addCreditLedger(input: $input)
  }
`;

export default ADD_CREDIT_LEDGER;
