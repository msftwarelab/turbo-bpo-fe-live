import gql from 'graphql-tag';

const ALL_ORDER_SUBMIT = gql`
  query AllOrderSubmit($year: Int!) {
    allOrderSubmit(year: $year) {
      coordinatorName
      month
      year
      month
      count
    }
  }
`;

export default ALL_ORDER_SUBMIT;
