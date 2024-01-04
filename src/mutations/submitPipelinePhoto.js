import gql from 'graphql-tag';

const SUBMIT_PIPELINE_PHOTO = gql`
  mutation SubmitPipelinePhoto($id: ID!, $IsSubmitPipelinePhoto: Boolean!) {
    submitPipelinePhoto(id: $id, IsSubmitPipelinePhoto: $IsSubmitPipelinePhoto)
  }
`;

export default SUBMIT_PIPELINE_PHOTO;
