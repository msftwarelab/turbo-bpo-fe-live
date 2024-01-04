import React from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import EditAnnouncement from '../../../EditAnnouncement';
import DeleteAnnouncement from '../../../DeleteAnnouncement';

const AnnouncementsTable = ({ data, loading, filter }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Subject</th>
        <th>Message</th>
        <th>Start date</th>
        <th>End date</th>
        <th style={{ width: '10%' }} className="text-center">
          Actions
        </th>
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
            <td>{item.subject}</td>
            <td>
              <div dangerouslySetInnerHTML={{ __html: item.message }} />
            </td>
            <td>{moment(item.startDate).format('MMM DD YYYY, hh:mm A')}</td>
            <td>{moment(item.endDate).format('MMM DD YYYY, hh:mm A')}</td>
            <td className="text-center">
              <EditAnnouncement announcement={item} filter={filter} />{' '}
              <DeleteAnnouncement announcement={item} filter={filter} />
            </td>
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

export default AnnouncementsTable;
