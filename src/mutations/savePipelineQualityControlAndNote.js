import gql from 'graphql-tag';

const SAVE_PIPELINE_QUALITY_CONTROL_AND_NOTE = gql`
  mutation SavePipelineQualityControlAndNote(
    $pipelineId: ID!
    $input: SavePipelineQualityControlAndNoteInput!
  ) {
    savePipelineQualityControlAndNote(pipelineId: $pipelineId, input: $input)
  }
`;

export default SAVE_PIPELINE_QUALITY_CONTROL_AND_NOTE;
