import gql from 'graphql-tag';

const ALL_PIPELINE_PHOTO = gql`
  query AllPipelinePhoto($pipelineId: ID!, $filter: FilterInput) {
    allPipelinePhoto(pipelineId: $pipelineId, filter: $filter) {
      totalCount
      results {
        id
        fileName
        fileSize
        url
        isSubmitted
        createdBy
        createdDateTime
      }
    }
  }
`;

export default ALL_PIPELINE_PHOTO;
