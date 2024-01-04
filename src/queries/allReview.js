import gql from 'graphql-tag';

const ALL_REVIEW = gql`
  query AllReview($filter: FilterInput) {
    allReview(filter: $filter) {
      totalCount
      results {
        id
        pipelineId
        orderNumber
        address
        assignedTo
        reviewDescription
        reviewDate
        reviewBy
        url
        fileName
      }
    }
  }
`;

export default ALL_REVIEW;
