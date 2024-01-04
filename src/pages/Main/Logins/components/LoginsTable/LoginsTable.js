import React from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment';

const LoginsTable = ({ data, loading, filter }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Username</th>
        <th>Date and Time</th>
        <th>IP address</th>
      </tr>
    </thead>
    <tbody>
      {loading ? (
        <tr>
          <td colSpan={5} className="text-center">
            loading...
          </td>
        </tr>
      ) : data.length ? (
        data.map(item => (
          <tr key={item.id}>
            <td>{item.username}</td>
            <td>{moment(item.datetime).format('MMM DD YYYY, hh:mm A')}</td>
            <td>{item.ipAddress}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={5} className="text-center">
            No data yet...
          </td>
        </tr>
      )}
    </tbody>
  </Table>
);

export default LoginsTable;
