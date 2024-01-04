import gql from 'graphql-tag';

const UPDATE_IFORM = gql`
  mutation UpdateIformTemp($pipelineId: ID!, $input: UpdateIformTempInput!) {
    updateIformTemp(pipelineId: $pipelineId, input: $input)
  }
`;

export default UPDATE_IFORM;
