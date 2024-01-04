import gql from 'graphql-tag';

const ALL_PIPELINE_COMPARABLE = gql`
  query AllPipelineComparable(
    $pipelineId: ID!
    $filter: PipelineComparableFilterInput
  ) {
    allPipelineComparable(pipelineId: $pipelineId, filter: $filter) {
      totalCount
      results {
        id
        mls
        status
        order
      }
    }
  }
`;

export default ALL_PIPELINE_COMPARABLE;
