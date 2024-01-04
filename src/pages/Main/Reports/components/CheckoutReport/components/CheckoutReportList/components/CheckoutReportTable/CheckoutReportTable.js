import React from 'react'
import { Table } from 'react-bootstrap'
import setCurrency from 'utils/setCurrency';
import moment from 'moment';

const CheckoutReportTable = ({ loading, data }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Client</th>
          <th>Invoice</th>
          <th>Total</th>
          <th>Status</th>
          <th>date</th>
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
                { clientName, invoice, total, status, date  },
                indx
              ) => (
               <tr key={indx}>
                  <td>{clientName}</td>
                  <td>{invoice}</td>
                  <td>{ setCurrency('USD', total, 2) }</td>
                  <td>{status}</td>
                  <td>
                      {moment(date).format('MMM DD YYYY, hh:mm A') }
                  </td>
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


export default CheckoutReportTable