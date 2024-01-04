import gql from 'graphql-tag';

export const UPDATE_PIPELINE = gql`
  mutation UpdatePIPELINE($id: ID!, $input: UpdatePipelineInput!) {
    updatePipeline(id: $id, input: $input)
  }
`;
