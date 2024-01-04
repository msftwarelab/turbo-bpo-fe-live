import gql from 'graphql-tag';

export const SAVE_PIPELINE_DOC = gql`
  mutation SavePipelineDoc($pipelineId: ID!, $input: PipelineDocInput!) {
    savePipelineDoc(pipelineId: $pipelineId, input: $input)
  }
`;
