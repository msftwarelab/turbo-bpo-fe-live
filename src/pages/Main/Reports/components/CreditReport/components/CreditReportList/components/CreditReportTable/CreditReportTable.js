import React from 'react'
import { Table } from 'react-bootstrap'
import moment from 'moment';
import setCurrency from 'utils/setCurrency';

const CreditReportTable = ({ loading, data }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Client</th>
          <th>Invoice</th>
          <th>Credits</th>
          <th>Expires's At</th>
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
                { clientName, invoice, credits, expiresAt, date  },
                indx
              ) => (
               <tr key={indx}>
                  <td>{clientName}</td>
                  <td>{invoice}</td>
                  <td>{setCurrency('USD', credits, 2) }</td>
                  <td>{moment(expiresAt).format('MMM DD YYYY, hh:mm A') }</td>
                  <td>{moment(date).format('MMM DD YYYY, hh:mm A')}</td>
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


export default CreditReportTable