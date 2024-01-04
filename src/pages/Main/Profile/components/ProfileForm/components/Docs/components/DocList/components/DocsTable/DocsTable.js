import React from 'react';
import { Table } from 'react-bootstrap';
import DeleteDoc from '../../../DeleteDoc';

const DocsTable = ({ data, loading, filter }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>File</th>
        <th>Type</th>
        <th className="text-center">Actions</th>
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
        data.map(item => (
          <tr key={item.id}>
            <td>
              {
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.fileName}
                </a>
              }
            </td>
            <td>{item.type}</td>
            <td className="text-center">
              <DeleteDoc doc={item} filter={filter} />
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

export default DocsTable;
