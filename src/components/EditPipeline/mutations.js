import gql from 'graphql-tag';

export const UPDATE_PIPELINE = gql`
  mutation UpdatePipeline($id: ID!, $input: UpdatePipelineInput!) {
    updatePipeline(id: $id, input: $input)
  }
`;
