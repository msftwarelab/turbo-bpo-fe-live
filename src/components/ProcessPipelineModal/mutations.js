import gql from 'graphql-tag';

export const PROCESS_PIPELINE = gql`
  mutation AssignPipeline($id: ID!, $input: UpdatePipelineInput!) {
    updatePipeline(id: $id, input: $input)
  }
`;
