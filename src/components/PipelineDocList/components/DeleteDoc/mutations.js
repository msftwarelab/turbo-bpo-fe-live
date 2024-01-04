import gql from 'graphql-tag';

export const DELETE_PIPELINE_DOC = gql`
  mutation DeletePipelineDoc($id: ID!) {
    deletePipelineDoc(id: $id)
  }
`;
