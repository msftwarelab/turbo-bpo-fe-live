import React, { useState } from 'react';
import { Query, withApollo } from 'react-apollo';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import { shape } from 'prop-types';
import { ALL_ADJUSTMENT } from './queries';
import { UPDATE_ADJUSTMENT } from './mutations';
import AdjustmentList from './components/AdjustmentList';

const Adjustments = ({ client }) => {
  const [isLoading, setLoading] = useState(false);
  const handleSave = async e => {
    setLoading(true);
    try {
      const promisedMutations = e.map(item => {
        return client.mutate({
          mutation: UPDATE_ADJUSTMENT,
          variables: {
            id: item.id,
            value: item.value ? parseFloat(item.value) : 0,
          },
        });
      });
      await Promise.all(promisedMutations);

      const { allAdjustment } = client.readQuery({ query: ALL_ADJUSTMENT });
      const updatedAdjustments = allAdjustment.map(item => {
        const found = e.find(adjust => adjust.id === item.id);
        if (found)
          return {
            ...item,
            value: found.value ? parseFloat(found.value) : 0,
          };
        return item;
      });

      client.writeQuery({
        query: ALL_ADJUSTMENT,
        data: {
          allAdjustment: updatedAdjustments,
        },
      });

      setLoading(false);
      cogoToast.success('Complete');
    } catch (err) {
      setLoading(false);
      cogoToast.error(setErrorMessage(err));
    }
  };
  return (
    <div>
      <Query query={ALL_ADJUSTMENT}>
        {({ loading, error, data = {} }) => {
          if (loading) return <div>loading...</div>;
          if (error) cogoToast.error(setErrorMessage(error));
          return (
            <AdjustmentList
              data={data.allAdjustment}
              onSave={handleSave}
              isLoading={isLoading}
            />
          );
        }}
      </Query>
    </div>
  );
};

Adjustments.propTypes = {
  client: shape({}),
};

Adjustments.defaultProps = {
  client: {},
};

export default withApollo(Adjustments);
