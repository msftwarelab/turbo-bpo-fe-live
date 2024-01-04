import gql from 'graphql-tag';

const ALL_PIPELINE_DOC = gql`
  query AllPipelineDoc($pipelineId: ID!, $filter: FilterInput) {
    allPipelineDoc(pipelineId: $pipelineId, filter: $filter) {
      totalCount
      results {
        id
        fileName
        url
        type
        createdBy
        createdDateTime
      }
    }
  }
`;

export default ALL_PIPELINE_DOC;
