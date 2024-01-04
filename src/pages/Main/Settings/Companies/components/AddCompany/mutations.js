import gql from 'graphql-tag';

export const SAVE_COMPANY = gql`
  mutation SaveCompany($input: CompanyInput!) {
    saveCompany(input: $input)
  }
`;
