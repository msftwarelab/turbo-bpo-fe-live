import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import { Table, Form } from 'react-bootstrap';
import Pagination from 'components/Pagination';
import moment from 'moment';
import { string, func, shape } from 'prop-types';
import ALL_USER from 'queries/allUser';

const UserAssignedList = ({ userRoles: roles, onSelect, selected }) => {
  const [filter, setFilter] = useState({
    roles,
    limit: 20,
    offset: 0,
  });
  useEffect(() => {
    setFilter({
      ...filter,
      roles,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles]);
  const { loading, error, data = {} } = useQuery(ALL_USER, {
    variables: {
      filter,
    },
  });
  if (error) cogoToast.error(setErrorMessage(error));
  const handleFilter = e => {
    setFilter({
      ...filter,
      offset: e.selected * filter.limit,
    });
  };
  const { allUser = {} } = data;
  const { totalCount = 0, results = [] } = allUser;
  const pageCount = Math.ceil(totalCount / filter.limit);

  const renderLoading = (
    <tr>
      <td colSpan={16} className="text-center">
        loading...
      </td>
    </tr>
  );

  const renderRow = results.length ? (
    results.map((item, i) => (
      <tr key={i}>
        <td>
          <Form.Group>
            <Form.Check
              type="checkbox"
              label={`${item.firstName} ${item.lastName}`}
              checked={selected ? selected.id === item.id : false}
              onChange={() => onSelect(item)}
            />
          </Form.Group>
        </td>
        <td>1</td>
        <td>8</td>
        <td>
          {item.assignDate
            ? moment(item.assignDate).format('MMM DD YYYY, hh:mm A')
            : null}
        </td>
        <td>{item.assignActive || 0}</td>
        <td>{item.assignHold || 0}</td>
        <td>{item.assignRush || 0}</td>
        <td>{item.assignStandby || 0}</td>
        <td>
          {item.assignActive +
            item.assignHold +
            item.assignRush +
            item.assignStandby || 0}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={9} className="text-center">
        No data yet...
      </td>
    </tr>
  );

  return (
    <div className="bg-white">
      <Table bordered striped hover size="sm">
        <thead>
          <tr>
            <th rowSpan="2">Name</th>
            <th rowSpan="2">Tier</th>
            <th rowSpan="2">MAO</th>
            <th rowSpan="2">Date</th>
            <th colSpan="5" className="text-center">
              Turbo load
            </th>
          </tr>
          <tr>
            <th rowSpan="2">Active</th>
            <th rowSpan="2">Hold</th>
            <th rowSpan="2">Rush</th>
            <th rowSpan="2">Standby</th>
            <th rowSpan="2">Total</th>
          </tr>
        </thead>
        <tbody>{loading ? renderLoading : renderRow}</tbody>
      </Table>
      {results && results.length ? (
        <Pagination
          pageCount={pageCount}
          onPageChange={handleFilter}
          currentPage={filter.offset / filter.limit}
        />
      ) : null}
    </div>
  );
};

UserAssignedList.propTypes = {
  userRoles: string,
  onSelect: func,
  selected: shape({}),
};

UserAssignedList.defaultProps = {
  userRoles: null,
  onSelect: e => e,
  selected: {},
};

export default UserAssignedList;
