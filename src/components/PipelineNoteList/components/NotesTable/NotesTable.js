import React from 'react';
import moment from 'moment';
import { Table } from 'react-bootstrap';
import getNotes from 'utils/getNotes';
import { StyledMessage } from './styles';

const NotesTable = ({ loading, data }) => (
  <Table striped bordered hover style={{ wordBreak: 'break-word' }}>
    <thead>
      <tr>
        <th width="70%">Message</th>
        <th width="30%">Date</th>
      </tr>
    </thead>
    <tbody>
      {loading ? (
        <tr>
          <td colSpan={3} className="text-center">
            loading...
          </td>
        </tr>
      ) : data.length ? (
        data.map((item, i) => (
          <tr key={i}>
            <StyledMessage>{getNotes(item)}</StyledMessage>
            <td>
              {moment(item.createdDateTime).format('MMM DD YYYY, hh:mm A')} by{' '}
              {item.createdBy}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3} className="text-center">
            No data yet...
          </td>
        </tr>
      )}
    </tbody>
  </Table>
);

export default NotesTable;
