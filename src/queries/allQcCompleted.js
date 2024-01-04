import gql from 'graphql-tag';

const ALL_QCCOMPLETED = gql`
 query AllQcCompleted($year: Int!) {
    allQcCompleted(year: $year) {
      qualityControlName
      month
      year
      normal
      fullRec
      dd
      total
    }
}
 
`;

export default ALL_QCCOMPLETED;
