import React from 'react';
import { Form } from 'react-bootstrap';
import { useMe } from 'contexts/Me';
import { func, shape } from 'prop-types';
import orderStatusOptions, {
  clientOrderStatusOptions,
  activeArray,
} from 'constants/orderStatusOptions';

const QuickFilter = ({ filter, onSearch }) => {
  const statusValue = filter.status ? filter.status[0] : '';

  const { me } = useMe();
  let statusOptions = orderStatusOptions;

  if (me.roles.includes('CLIENT')) {
    statusOptions = clientOrderStatusOptions;
  }

  const handleChange = e => {
    const { name, value } = e.target;
    if (value) {
      onSearch({
        ...filter,
        [name]: value === 'ACTIVE' ? activeArray : [value],
      });
    } else {
      const newFilter = { ...filter };
      delete newFilter[name];
      onSearch(newFilter);
    }
  };
  return (
    <div className="d-flex align-items-center">
      <Form.Label className="mr-2">Filter: </Form.Label>
      <Form.Control
        as="select"
        name="status"
        onChange={handleChange}
        value={statusValue}
      >
        <option value="">All</option>
        {statusOptions.map((item, key) => (
          <option key={key} value={item.value}>
            {item.label}
          </option>
        ))}
      </Form.Control>
    </div>
  );
};

QuickFilter.propTypes = {
  filter: shape({}),
  onSearch: func,
};

QuickFilter.defaultProps = {
  filter: {},
  onSearch: e => e,
};

export default QuickFilter;
