import gql from 'graphql-tag';

const SAVE_PIPELINE = gql`
  mutation SavePipeline($input: PipelineInput!) {
    savePipeline(input: $input)
  }
`;

export default SAVE_PIPELINE;
