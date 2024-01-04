import gql from 'graphql-tag';

const ALL_CREDITS = gql`
  query AllCredits($filter: CreditsFilterInput) {
    allCredits(filter: $filter) {
      totalCount
      results {
        clientName
        invoice
        credits
        expiresAt
        date
      }
    }
  }
`;

export default ALL_CREDITS;
