import React from 'react'

const TableFooter = ({ data = [] }) => {
  let totalOrders = 0
  let totalPercent = 0

  if ( data.length > 0) {
    totalOrders = data.reduce(( total, { orderTotal = 0} ) => total + orderTotal, 0)
    totalPercent = '100'
  }
 
  return ( 
    <tr>
      <td className="text-center">
       Total {' '}  
      </td>
      <td className="text-left">
        <input type="text" className="form-control col-3" value={totalOrders} readOnly/>
      </td>
      <td className="text-left">
        <input type="text" className="form-control col-3" value={`${totalPercent}%`} readOnly/>
      </td>
    </tr>
  )
}

export default TableFooter