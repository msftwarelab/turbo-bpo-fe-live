import React from 'react';
import moment from 'moment';
import { Table } from 'react-bootstrap';

const QualityControlsTable = ({ loading, data }) => (
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
          <td colSpan={2} className="text-center">
            loading...
          </td>
        </tr>
      ) : data.length ? (
        data.map((item, i) => (
          <tr key={i}>
            <td>
              <div dangerouslySetInnerHTML={{ __html: item.orderNotes }} />
            </td>
            <td>
              {moment(item.createdDateTime).format('MMM DD YYYY, hh:mm A')} by{' '}
              {item.createdBy}
            </td>
          </tr>
        ))
      ) : (
            <tr>
              <td colSpan={2} className="text-center">
                No data yet...
          </td>
            </tr>
          )}
    </tbody>
  </Table>
);

export default QualityControlsTable;
