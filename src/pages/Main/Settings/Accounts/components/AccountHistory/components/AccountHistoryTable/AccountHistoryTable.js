import React from 'react';
import { Table } from 'react-bootstrap';
import Collapse from './components/Collapse';
import moment from 'moment' 

const AccountHistoryTable = ({ data }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Action</th>
        <th>Log</th>
        <th>Date/Time</th>
      </tr>
    </thead>
    <tbody>
      {data.map( (item, k) => (
        <tr key={k}>
          <td>{item.action}</td>
          <td>
            <Collapse value={item.value} />
          </td>
          <td>{ moment(item.datetime).format("MMM M YYYY, h:mm a") }  {item.modifiedBy ?  `by ${item.modifiedBy}` :' ' }</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default AccountHistoryTable;
