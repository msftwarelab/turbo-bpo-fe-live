import React from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import omit from 'lodash/omit';
import UserCompany from 'components/UserCompany';
import EditPriceModule from 'components/EditPriceModule';
import { shape, bool, arrayOf } from 'prop-types';
import EditUser from '../../../EditUser';

const UsersTable = ({ data, loading, filter }) => {
  const renderLoading = (
    <tr>
      <td colSpan={5} className="text-center">
        loading...
      </td>
    </tr>
  );

  const renderRow = data.length ? (
    data.map(item => (
      <tr key={item.id}>
        <td>
          {item.firstName} {item.lastName}
        </td>
        <td>{item.email}</td>
        <td>{moment(item.createdDateTime).format('MMM DD YYYY, hh:mm A')}</td>
        <td className="text-center">
          <UserCompany user={item} filter={filter} />{' '}
          <EditUser
            user={omit(item, [
              'profilePicture',
              'priceModule',
              'assignDate',
              'assignDate',
              'assignActive',
              'assignHold',
              'assignRush',
              'assignStandby',
            ])}
            filter={filter}
          />{' '}
          <EditPriceModule user={item} filter={filter} />
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={5} className="text-center">
        No data yet...
      </td>
    </tr>
  );

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email address</th>
          <th>Date registered</th>
          <th style={{ width: '10%' }} className="text-center">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>{loading ? renderLoading : renderRow}</tbody>
    </Table>
  );
};

UsersTable.propTypes = {
  data: arrayOf(shape({})),
  loading: bool,
  filter: shape({}),
};

UsersTable.defaultProps = {
  data: [],
  loading: false,
  filter: {},
};

export default UsersTable;
