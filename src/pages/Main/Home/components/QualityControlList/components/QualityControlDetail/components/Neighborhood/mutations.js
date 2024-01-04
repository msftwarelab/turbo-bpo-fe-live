import gql from 'graphql-tag';

export const UPDATE_NEIGHBORHOOD = gql`
  mutation UpdatePipelineNeighborhood(
    $pipelineId: ID!
    $input: UpdatePipelineNeighborhoodInput!
  ) {
    updatePipelineNeighborhood(pipelineId: $pipelineId, input: $input)
  }
`;
