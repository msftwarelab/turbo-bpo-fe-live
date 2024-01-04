import gql from 'graphql-tag';

const SAVE_PIPELINE_NOTE = gql`
  mutation SavePipelineNote($pipelineId: ID!, $input: SavePipelineNoteInput!) {
    savePipelineNote(pipelineId: $pipelineId, input: $input)
  }
`;

export default SAVE_PIPELINE_NOTE;
