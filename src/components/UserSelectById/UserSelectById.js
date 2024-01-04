import React, { useEffect, useState } from 'react';
import { withApollo } from 'react-apollo';
import removeNull from 'utils/removeNull';
import { string, func, shape, oneOfType, arrayOf, bool } from 'prop-types';
import AsyncSelect from 'react-select/async';
import ALL_USER from 'queries/allUser';
import USER from 'queries/user';

const UserSelectById = ({
  value,
  disabled,
  userRoles = ['CLIENT'],
  onChange,
  client,
}) => {
  const [newValue, setNewValue] = useState(
    value
      ? {
          label: value,
          value,
        }
      : {}
  );

  const loadUserById = async id => {
    const { data } = await client.query({
      query: USER,
      variables: {
        id,
      },
    });
    const { user = {} } = data;
    setNewValue({
      label: `${user.firstName} ${user.lastName}`,
      value: user.id,
      detailed: user,
    });
  };

  useEffect(() => {
    if (value) loadUserById(value);
    if (!value) {
      setNewValue({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const loadOptions = async inputValue => {
    const filter = removeNull({
      offset: 0,
      limit: 10,
      roles: userRoles,
      name: inputValue || undefined,
    });
    const { data } = await client.query({
      query: ALL_USER,
      variables: { filter },
      fetchPolicy: 'network-only',
    });
    const { allUser = {} } = data;
    const { results = [] } = allUser;
    return results.map(item => ({
      label: `${item.firstName} ${item.lastName}`,
      value: item.id,
      detailed: item,
    }));
  };

  const handleChange = e => {
    onChange(e);
    setNewValue(value);
  };

  return (
    <AsyncSelect
      isDisabled={disabled}
      onChange={handleChange}
      value={newValue}
      defaultOptions
      loadOptions={loadOptions}
    />
  );
};

UserSelectById.propTypes = {
  value: oneOfType([shape({}), arrayOf(shape({})), string]),
  userRoles: arrayOf(string),
  onChange: func,
  client: shape({}),
  disabled: bool,
};

UserSelectById.defaultProps = {
  value: null,
  userRoles: ['CLIENT'],
  onChange: e => e,
  client: {},
  disabled: false,
};

export default withApollo(UserSelectById);
