import React, { useState } from 'react';
import { Query, withApollo } from 'react-apollo';
import setErrorMessage from 'utils/setErrorMessage';
import cogoToast from 'cogo-toast';
import removeNull from 'utils/removeNull';
import { shape } from 'prop-types';
import removeTypeName from 'utils/removeTypeName';
import { useMe } from 'contexts/Me';
import DEFAULT from 'queries/default';
import UPDATE_DEFAULT from 'mutations/updateDefault';
import DefaultsForm from './components/DefaultsForm';

const Defaults = ({ client }) => {
  const { me } = useMe();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async data => {
    setLoading(true);
    const input = removeNull(data);
    input.firePlace = input.firePlace === 'Yes';

    try {
      const {
        data: { updateDefault },
      } = await client.mutate({
        mutation: UPDATE_DEFAULT,
        variables: {
          input,
        },
        refetchQueries: [
          {
            query: DEFAULT,
          },
        ],
      });
      setLoading(false);
      if (updateDefault) cogoToast.success('Default updated');
      else cogoToast.error(setErrorMessage());
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };
  return (
    <Query query={DEFAULT}>
      {({ loading, error, data = {} }) => {
        if (loading) return <div>loading...</div>;
        if (error) cogoToast.error(setErrorMessage(error));
        const defaultData = {
          ...data.default,
          firePlace: data.default && data.default.firePlace ? 'Yes' : 'No',
        };
        return (
          <DefaultsForm
            isLoading={isLoading}
            initialValues={removeTypeName(defaultData)}
            onSubmit={handleSubmit}
            roles={me.roles}
          />
        );
      }}
    </Query>
  );
};

Defaults.propTypes = {
  client: shape({}),
};

Defaults.defaultProps = {
  client: {},
};

export default withApollo(Defaults);
