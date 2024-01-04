import gql from 'graphql-tag';

const ALL_REQUEST = gql`
  query AllRequest($filter: RequestFilterInput) {
    allRequest(filter: $filter) {
      totalCount
      results {
        id
        status
        type
        orderType
        pipelineId
        orderNumber
        address
        company
        conditionType
        createdDateTime
        requestedById
        requestedBy
        remarks
      }
    }
  }
`;

export default ALL_REQUEST;
