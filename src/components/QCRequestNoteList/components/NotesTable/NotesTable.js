import React from 'react';
import moment from 'moment';
import { Table } from 'react-bootstrap';
import { StyledMessage } from './styles';
import getNotes  from 'utils/getNotes'

const NotesTable = ({ loading, data }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Message</th>
        <th>Date</th>
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
