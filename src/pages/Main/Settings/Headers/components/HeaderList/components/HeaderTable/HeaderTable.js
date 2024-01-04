import React from 'react';
import { Table } from 'react-bootstrap';
import EditHeader from '../../../EditHeader';
import DeleteHeader from '../../../DeleteHeader';
import HeaderDetails from '../../../HeaderDetails';

const HeaderTable = ({ data, loading, filter }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Name</th>
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
            <td>{item.name}</td>
            <td className="text-center">
              <HeaderDetails header={item} />{' '}
              <EditHeader header={item} filter={filter} />{' '}
              <DeleteHeader header={item} filter={filter} />
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

export default HeaderTable;
