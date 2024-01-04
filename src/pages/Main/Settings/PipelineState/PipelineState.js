import React, { useState } from 'react';
import { Query, withApollo } from 'react-apollo';
import setErrorMessage from 'utils/setErrorMessage';
import cogoToast from 'cogo-toast';
import { shape } from 'prop-types';
import removeNull from 'utils/removeNull';
import removeTypeName from 'utils/removeTypeName';
import PIPELINE_STATE from 'queries/pipelineState';
import PipelineStateForm from './components/PipelineStateForm';
import { UPDATE_PIPELINE_STATE } from './mutations';

const PipelineState = ({ client }) => {
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async data => {
    setLoading(true);
    const input = removeNull(data);
    try {
      const {
        data: { updatePipelineState },
      } = await client.mutate({
        mutation: UPDATE_PIPELINE_STATE,
        variables: {
          input,
        },
        refetchQueries: [
          {
            query: PIPELINE_STATE,
          },
        ],
      });
      setLoading(false);
      if (updatePipelineState) cogoToast.success('Pipeline updated');
      else cogoToast.error(setErrorMessage());
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };
  return (
    <Query query={PIPELINE_STATE}>
      {({ loading, error, data = {} }) => {
        if (loading) return <div>loading...</div>;
        if (error) cogoToast.error(setErrorMessage(error));
        const { pipelineState = {} } = data;
        delete pipelineState.todayOrderCount;
        return (
          <PipelineStateForm
            isLoading={isLoading}
            initialValues={removeTypeName(pipelineState)}
            onSubmit={handleSubmit}
          />
        );
      }}
    </Query>
  );
};

PipelineState.propTypes = {
  client: shape({}),
};

PipelineState.defaultProps = {
  client: {},
};

export default withApollo(PipelineState);
