import React from 'react';
import { Table } from 'react-bootstrap';
import TableFooter from './components/TableFooter'

const TeamsTable = ({ data, loading, hideOrders }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          {!hideOrders && <th>Orders</th>}
          {!hideOrders && <th>Assignment%</th>}
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
          data.map(
            (
              { id, firstName, lastName, orderTotal, assignmentPercentage },
              indx
            ) => (
              <tr key={id} >
                <td>{` ${firstName}, ${lastName}`}</td>
                {!hideOrders && <td>{orderTotal}</td>}
                {!hideOrders && <td>{Math.round(assignmentPercentage * 100)}%</td>}
              </tr>
            )
          )
        ) 

        : (
          <tr>
            <td colSpan={3} className="text-center">
              No data yet...
            </td>
          </tr>
        )}

        { !hideOrders && <TableFooter data={data}/> } 
      </tbody>
    </Table>
  );
};

export default TeamsTable;
