import gql from 'graphql-tag';

const ALL_COMPANY = gql`
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
        forms {
          name
          style
        }
      }
    }
  }
`;

export default ALL_COMPANY;
