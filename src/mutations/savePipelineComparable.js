import gql from 'graphql-tag';

const SAVE_PIPELINE_COMPARABLE = gql`
  mutation SavePipelineComparable($input: PipelineComparableInput!) {
    savePipelineComparable(input: $input)
  }
`;

export default SAVE_PIPELINE_COMPARABLE;
