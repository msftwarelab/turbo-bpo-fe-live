import gql from 'graphql-tag';

const UPDATE_COMPANY = gql`
  mutation UpdateCompany($id: ID!, $input: CompanyInput!) {
    updateCompany(id: $id, input: $input)
  }
`;

export default UPDATE_COMPANY;
