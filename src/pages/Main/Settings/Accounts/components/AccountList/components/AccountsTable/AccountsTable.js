import React from 'react';
import { Table } from 'react-bootstrap';
import EditAccount from '../../../EditAccount';
import DeleteAccount from '../../../DeleteAccount';
import AccountHistory from '../../../AccountHistory';

const AccountsTable = ({ data, loading, filter }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Username</th>
        <th>Password</th>
        <th>Company</th>
        <th>Others</th>
        <th>Website</th>
        <th style={{ width: '10%' }} className="text-center">
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
      {loading ? (
        <tr>
          <td colSpan={6} className="text-center">
            loading...
          </td>
        </tr>
      ) : data.length ? (
        data.map((item, indx) => (
          <tr key={item.id}>
            <td>{item.username}</td>
            <td>{item.password}</td>
            <td>{item.company}</td>
            <td>{item.others}</td>
            <td>{item.webSite}</td>
            <td className="text-center">
              <EditAccount account={item} filter={filter} />{' '}
              <AccountHistory account={item} />{' '}
              <DeleteAccount account={item} filter={filter} />
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={6} className="text-center">
            No data yet...
          </td>
        </tr>
      )}
    </tbody>
  </Table>
);

export default AccountsTable;
