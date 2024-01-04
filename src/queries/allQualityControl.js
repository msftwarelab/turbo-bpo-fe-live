import gql from 'graphql-tag';

const ALL_QUALITY_CONTROL = gql`
  query AllQualityControl($filter: FilterInput) {
    allQualityControl(filter: $filter) {
      totalCount
      results {
        id
        pipelineId
        orderNumber
        orderType
        clientName
        requests
        status
        assignee
        assigneeId
        address
        history {
          status
          reason
          date
          cratedby
          currentAssignee
          newAssignee
        }
        createdDateTime
        LastUpdateTime
      }
    }
  }
`;

export default ALL_QUALITY_CONTROL;
