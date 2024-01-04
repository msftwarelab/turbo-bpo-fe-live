import gql from 'graphql-tag';

const UPDATE_IFORM = gql`
  mutation UpdateIform($pipelineId: ID!, $input: UpdateIformInput!) {
    updateIform(pipelineId: $pipelineId, input: $input)
  }
`;

export default UPDATE_IFORM;
