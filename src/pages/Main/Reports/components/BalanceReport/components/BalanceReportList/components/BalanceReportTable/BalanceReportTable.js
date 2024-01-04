import React from 'react'
import { Table } from 'react-bootstrap'
import setCurrency from 'utils/setCurrency';

const BalanceReportTable = ({ loading, data }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Client</th>
          <th>Total</th>
          <th>Paid Amount</th>
          <th>Other</th>
          <th>Unpaid</th>
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
            data.map(
              (
                { client, total, paidAmount, other, unpaid  },
                indx
              ) => (
               <tr key={indx}>
                  <td>{client}</td>
                  <td>{setCurrency('USD', total, 2)}</td>
                  <td>{setCurrency('USD', paidAmount, 2) }</td>
                  <td>{setCurrency('USD', other, 2) }</td>
                  <td>{setCurrency('USD', unpaid, 2) }</td>
                </tr>
              )
            )
        
        ): (
          <tr>
            <td colSpan={5} className="text-center">
              No data yet...
            </td>
          </tr>
        )}
     
      </tbody>
    </Table>
  )
}


export default BalanceReportTable