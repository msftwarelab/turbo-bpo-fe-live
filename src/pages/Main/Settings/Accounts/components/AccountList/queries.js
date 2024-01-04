import gql from 'graphql-tag';

export const ALL_ACCOUNT = gql`
  query AllAccount($filter: AccountFilterInput) {
    allAccount(filter: $filter) {
      totalCount
      results {
        id
        recordType
        company
        webSite
        username
        password
        question1
        answer1
        question2
        answer2
        question3
        answer3
        others
        logs {
          datetime
          action
          modifiedBy
          value
        }
      }
    }
  }
`;

export default {};
