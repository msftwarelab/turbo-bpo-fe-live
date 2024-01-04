import React from 'react'

const FilterYear = ({ topFilter, handleTopFilter }) => {

  const handleChange= (e) => handleTopFilter(e)

  return (
    <input type="text" name="orderYear" value={topFilter.orderYear}  className="mr-2 form-control" onChange={handleChange} placeholder="Year"/>
  )
}

export default FilterYear