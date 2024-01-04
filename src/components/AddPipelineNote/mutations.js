import gql from 'graphql-tag';

export const SAVE_PIPELINE_NOTE = gql`
  mutation SavePipelineNote($pipelineId: ID!, $message: String!) {
    savePipelineNote(pipelineId: $pipelineId, message: $message)
  }
`;
