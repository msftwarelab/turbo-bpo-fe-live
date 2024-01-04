import gql from 'graphql-tag';

export const SAVE_PIPELINE_QUALITY_CONTROL = gql`
  mutation SavePipelineQualityControl($pipelineId: ID!, $message: String!) {
    savePipelineQualityControl(pipelineId: $pipelineId, message: $message)
  }
`;
