import gql from 'graphql-tag';

const UPDATE_PIPELINE_REPAIR = gql`
  mutation UpdatePipelineRepair(
    $pipelineId: ID!
    $input: UpdatePipelineRepairInput!
  ) {
    updatePipelineRepair(pipelineId: $pipelineId, input: $input)
  }
`;

export default UPDATE_PIPELINE_REPAIR;
