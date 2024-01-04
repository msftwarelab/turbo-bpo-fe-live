import React from 'react'
import { Table } from 'react-bootstrap'
import moment from 'moment';

const OrderSubmitReportTable = ({ loading, data }) => {
  return (
    <Table striped bordered hover>
      <thead>
         <tr>
          <th rowSpan="2">Coordinator</th>
          {[...Array(12)].map((_, key) => {
            return (
              <th className="text-center" colSpan="1" key={key}>
                {moment()
                  .month(key)
                  .format('MMMM')}
              </th>
            );
          })}
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan={30} className="text-center">
              loading...
            </td>
          </tr>
        ) : data.length ?
        
          data.map((item, i) => (
            <tr key={i}>
              <td>{item.coordinatorName}</td>
              {item.months.map((subItem, key) => (
                 <React.Fragment key={key}>
                    <td>{subItem.count}</td>
                 </React.Fragment>
              ))}
              <td>{item.total}</td>
            </tr>
          ))
         : (
          <tr>
            <td colSpan={30} className="text-center">
              No data yet...
            </td>
          </tr>
        )}
     
      </tbody>
    </Table>
  )
}


export default OrderSubmitReportTable