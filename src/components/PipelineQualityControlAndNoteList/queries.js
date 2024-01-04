import gql from 'graphql-tag';

export const ALL_PIPELINE_NOTE = gql`
  query AllPipelineNote($pipelineId: ID!, $filter: FilterInput) {
    allPipelineNote(pipelineId: $pipelineId, filter: $filter) {
      totalCount
      results {
        id
        message
        createdBy
        createdDateTime
      }
    }
  }
`;

export default {};
