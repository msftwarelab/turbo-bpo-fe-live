import gql from 'graphql-tag';

const SAVE_REVIEW = gql`
  mutation saveReview($input: SaveReviewInput!) {
    saveReview(input: $input)
  }
`;

export default SAVE_REVIEW;
