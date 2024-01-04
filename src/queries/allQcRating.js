import gql from 'graphql-tag';

const ALL_QCRATING = gql`
  query AllQcRating($year: Int!, $type: String) {
    allQcRating(year: $year, type: $type) {
      contractorName
      month
      year
      noOfOders
      noOfQcL
      percentOfQc
    }
  }
`;

export default ALL_QCRATING;
