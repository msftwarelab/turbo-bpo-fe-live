import React from 'react';
import moment from 'moment';
import { Table } from 'react-bootstrap';

const QualityControlAndNotesTable = ({ loading, data }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Message</th>
        <th>Category</th>
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
            <td dangerouslySetInnerHTML={{ __html: item.message }} />
            <td>{item.category}</td>
            <td>
              {moment(item.date).format('MMM DD YYYY, hh:mm A')} by{' '}
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

export default QualityControlAndNotesTable;
