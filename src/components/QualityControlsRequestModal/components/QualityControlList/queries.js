import gql from 'graphql-tag';

export const ALL_PIPELINE_QUALITY_CONTROL = gql`
  query AllPipelineQualityControl($pipelineId: ID!, $filter: FilterInput) {
    allPipelineQualityControl(pipelineId: $pipelineId, filter: $filter) {
      totalCount
      results {
        orderNotes
        createdBy
        createdDateTime
      }
    }
  }
`;

export default {};
