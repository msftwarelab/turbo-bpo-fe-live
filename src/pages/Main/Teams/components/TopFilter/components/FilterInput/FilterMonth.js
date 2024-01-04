import React from 'react'

const FilterMonth = ({ topFilter, handleTopFilter }) => {
  const months = {
      "Select Month": 0, 
      "January":1,
      "February":2, 
      "March":3, 
      "April":4, 
      "May":5, 
      "June":6,
      "July":7, 
      "August":8, 
      "September":9, 
      "October":10, 
      "November":11, 
      "December" :12,
    };

  const handleChange= (e) => handleTopFilter(e)

  return (
      <select name="orderMonth" onChange={handleChange}  value={topFilter.orderMonth} className="mr-2 form-control">
      { Object.keys(months).map( (k, i) => <option value={months[k]} key={i}>{k}</option>)}
      </select>
  )
}

export default FilterMonth