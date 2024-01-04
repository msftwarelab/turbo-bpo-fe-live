import gql from 'graphql-tag';

const UPDATE_REVIEW = gql`
  mutation UpdateReview($id: ID!, $input: UpdateReviewInput!) {
    updateReview(id: $id, input: $input)
  }
`;

export default UPDATE_REVIEW;
