import React from 'react'
import moment from 'moment';
import { Table } from 'react-bootstrap'

const totalPercentQc = (qc, orders) => {

  if ( (!qc || qc === 0 ) || (!orders || orders === 0 )) return 0

  return (parseInt(qc) / parseInt(orders) ) * 100
}  

const QCRatingReportTable = ({ loading, data }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th rowSpan="2">Contractor</th>
          {[...Array(12)].map((_, key) => {
            return (
              <th className="text-center" colSpan="3" key={key}>
                {moment()
                  .month(key)
                  .format('MMMM')}
              </th>
            );
          })}
          <th colSpan="3">total</th>
        </tr>
        <tr>
          {[...Array(13)].map((_, key) => {
            return (
              <React.Fragment key={key}>
                <th className="text-center"># Of Orders </th>
                <th className="text-center"># Of QC </th>
                <th className="text-center">% of QC</th>
              </React.Fragment>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan="40" className="text-left">
              loading...
            </td>
          </tr>
        ) : data.length ? 
          data.map(({ months, total, contractorName}, i) => (
            <tr key={i}>
              <td>{contractorName} </td>
              {months.map((subItem, key) => (
                 <React.Fragment key={key}>
                    <td>{subItem.noOfOders}</td>
                    <td>{subItem.noOfQcL}</td>
                    <td>{subItem.percentOfQc}</td>
                 </React.Fragment>
              ))}
              <td>{total.noOfOders}</td>
              <td>{total.noOfQcL}</td>
              <td>{totalPercentQc(total.noOfOders, total.noOfQcL)}</td>
            </tr>
          ))

        : (
          <tr>
           <td colSpan="40" class="text-left">No data yet...</td>
          </tr>
        )}
     
      </tbody>
    </Table>
  )
}


export default QCRatingReportTable