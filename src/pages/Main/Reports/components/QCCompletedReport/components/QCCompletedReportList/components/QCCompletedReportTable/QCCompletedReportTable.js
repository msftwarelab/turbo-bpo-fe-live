import React from 'react'
import moment from 'moment';
import { Table } from 'react-bootstrap'

const QCCompletedReportTable = ({ loading, data }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th rowSpan="2">Quality Control</th>
          {[...Array(12)].map((_, key) => {
            return (
              <th className="text-center" colSpan="4" key={key}>
                {moment()
                  .month(key)
                  .format('MMMM')}
              </th>
            );
          })}
        </tr>
        <tr>
          {[...Array(12)].map((_, key) => {
            return (
              <React.Fragment key={key}>
                <th className="text-center">Normal </th>
                <th className="text-center">Full Rec </th>
                <th className="text-center">DD</th>
                <th className="text-center">Total</th>
              </React.Fragment>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan={49} className="text-center">
              loading...
            </td>
          </tr>
        ) : data.length ? 
          data.map((item, i) => (
            <tr key={i}>
              <td>{item.qualityControlName}</td>
              {item.months.map((subItem, key) => (
                 <React.Fragment key={key}>
                    <td>{subItem.normal}</td>
                    <td>{subItem.fullRec}</td>
                    <td>{subItem.dd}</td>
                    <td>{subItem.total}</td>
                 </React.Fragment>
              ))}
            </tr>
          ))
      
        : (
          <tr>
            <td colSpan={49} className="text-left">
              No data yet...
            </td>
          </tr>
        )}
     
      </tbody>
    </Table>
  )
}


export default QCCompletedReportTable