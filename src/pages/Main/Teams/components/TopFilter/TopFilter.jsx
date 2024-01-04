import React from 'react'
import { FilterMonth, FilterYear }  from './components/FilterInput'

const TopFilter = ({ topFilter, handleTopFilter }) => {
  return (
    <div className="mb-2 form-inline">
      <FilterMonth topFilter={topFilter} handleTopFilter={handleTopFilter}/>
      <FilterYear   topFilter={topFilter} handleTopFilter={handleTopFilter}/>
    </div>
  )
}

export default TopFilter