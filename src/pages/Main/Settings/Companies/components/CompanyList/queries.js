import gql from 'graphql-tag';

export const ALL_COMPANY = gql`
  query AllCompany($filter: CompanyFilterInput) {
    allCompany(filter: $filter) {
      totalCount
      results {
        id
        name
        webSite
        isAdmin
        isClient
        isPremium
      }
    }
  }
`;

export default {};
