import React, { useState } from 'react';
import { withApollo } from 'react-apollo';
import { func, shape } from 'prop-types';
import UserSelect from 'components/UserSelect';
import getGroupedObject from 'utils/getGroupedObject';
import BillingUserSelectModal from 'components/BillingUserSelectModal';
import ALL_PIPELINE from 'queries/allPipeline';

const BillingSearchClient = ({ client, onSelect }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [userOptions, setUserOptions] = useState([]);
  const handleChange = async e => {
    setUser(e);
    const { data } = await client.query({
      query: ALL_PIPELINE,
      variables: {
        filter: {
          offset: 0,
          authorId: e,
          limit: 1000,
          isProcessIfill: true,
          isProcessIform: true,
          status: ['ACTIVE', 'COMPLETE', 'STANDBY'],
        },
      },
    });
    const { allPipeline = {} } = data;
    const grouped = getGroupedObject(allPipeline.results, 'authorId');
    const newUserOptions = Object.keys(grouped).map(authorId => ({
      pipelines: grouped[authorId]
        .filter(item => !item.isBilled)
        .map(item => ({
          isSelected: true,
          ...item,
        })),
      username: grouped[authorId][0].authorName,
      id: grouped[authorId][0].authorId,
    }));
    setUserOptions(newUserOptions);
    setLoading(false);

    return false;
  };

  const handleUserChange = newUserOption => {
    setUser(newUserOption.id);
    onSelect({
      userId: newUserOption.id,
      entries: newUserOption.pipelines.filter(item => item.isSelected),
    });
  };

  return (
    <div className="d-flex">
      <div className="mr-2" style={{ width: 200 }}>
        <UserSelect
          returnValue="ID"
          onChange={handleChange}
          userRoles={['CLIENT']}
          value={user || ''}
        />
      </div>
      <BillingUserSelectModal
        options={userOptions}
        onSelect={handleUserChange}
        isLoading={isLoading}
      />
    </div>
  );
};

BillingSearchClient.propTypes = {
  onSelect: func,
  client: shape({}),
};

BillingSearchClient.defaultProps = {
  onSelect: e => e,
  client: {},
};

export default withApollo(BillingSearchClient);
