import gql from 'graphql-tag';

export const SAVE_PIPELINE_PHOTO = gql`
  mutation SavePipelinePhoto($pipelineId: ID!, $input: PipelinePhotoInput!) {
    savePipelinePhoto(pipelineId: $pipelineId, input: $input)
  }
`;
