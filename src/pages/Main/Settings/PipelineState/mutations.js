import gql from 'graphql-tag';

export const UPDATE_PIPELINE_STATE = gql`
  mutation UpdatePipelineState($input: UpdatePipelineStateInput!) {
    updatePipelineState(input: $input)
  }
`;
