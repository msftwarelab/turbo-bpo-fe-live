import React from 'react';
import { Query, withApollo } from 'react-apollo';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import ALL_COMMENT from 'queries/allComment';
import CommentList from './components/CommentList';

const Comments = () => (
  <Query query={ALL_COMMENT}>
    {({ loading, error, data = {} }) => {
      if (loading) return <div>loading...</div>;
      if (error) cogoToast.error(setErrorMessage(error));
      return <CommentList data={data.allComment} />;
    }}
  </Query>
);

export default withApollo(Comments);
