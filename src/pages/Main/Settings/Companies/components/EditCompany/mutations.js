import gql from 'graphql-tag';

export const UPDATE_COMPANY = gql`
  mutation UpdateCompany($id: ID!, $input: CompanyInput!) {
    updateCompany(id: $id, input: $input)
  }
`;
