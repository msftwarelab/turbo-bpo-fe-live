import gql from 'graphql-tag';

const ALL_PIPELINE_QUALITY_CONTROL_AND_NOTE = gql`
  query AllPipelineQualityControlAndNote(
    $pipelineId: ID!
    $filter: FilterInput
  ) {
    allPipelineQualityControlAndNote(pipelineId: $pipelineId, filter: $filter) {
      totalCount
      results {
        message
        date
        category
        createdBy
      }
    }
  }
`;

export default ALL_PIPELINE_QUALITY_CONTROL_AND_NOTE;
