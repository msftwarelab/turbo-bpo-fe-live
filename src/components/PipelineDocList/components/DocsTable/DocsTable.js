import React from 'react';
import { Table, Form } from 'react-bootstrap';
import moment from 'moment';

const DocsTable = ({
  selectedDocs,
  onSelectDoc = e => e,
  onAllSelectedDocs = e => e,
  loading,
  data = [],
  pipelineId,
  filter,
  pipelineFilter,
}) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>
          <Form.Group>
            <Form.Check
              type="checkbox"
              checked={data.every(item =>
                selectedDocs.map(selected => selected.id).includes(item.id)
              )}
              onClick={onAllSelectedDocs}
            />
          </Form.Group>
        </th>
        <th>File</th>
        <th>Type</th>
        <th>Date</th>
        
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
            <td>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  checked={selectedDocs
                    .map(select => select.id)
                    .includes(item.id)}
                  onChange={() => onSelectDoc(item)}
                />
              </Form.Group>
            </td>
            <td>
              {
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.fileName}
                </a>
              }
            </td>
            <td>{item.type}</td>
            <td>
              {moment(item.createdDateTime).format('MMM DD YYYY, hh:mm A')} by{' '}
              {item.createdBy}
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

export default DocsTable;
