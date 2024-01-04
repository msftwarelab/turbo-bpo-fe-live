import gql from 'graphql-tag';

const ALL_QC_REQUEST = gql`
  query AllQCRequest($filter: QcRequestFilterInput) {
    allQcRequest(filter: $filter) {
      totalCount
      results {
        id
        qcId
        pipelineId
        qcTotal
        notesTotal
        orderNumber
        address
        company
        type
        orderAssignee
        qcAssignee
        status
        requestDate
        requestType
      }
    }
  }
`;

export default ALL_QC_REQUEST;
