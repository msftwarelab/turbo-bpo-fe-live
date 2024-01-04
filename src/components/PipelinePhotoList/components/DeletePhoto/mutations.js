import gql from 'graphql-tag';

export const DELETE_PIPELINE_PHOTO = gql`
  mutation DeletePipelinePhoto($id: ID!) {
    deletePipelinePhoto(id: $id)
  }
`;
