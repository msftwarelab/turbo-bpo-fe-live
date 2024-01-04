import React from 'react'

const SelectYear = ({ name, currentValue = '', handleChange }) => {

  const selectYear = [] 

  selectYear.push(<option value={0} key={0}>Select Year</option>) 

  for( let y = new Date().getFullYear(); y>2000; y--)
  {
    selectYear.push(<option value={y} key={y}>{y}</option>)
  }

  return (
    <select name={name} onChange={handleChange} value={currentValue}>
      { selectYear }
    </select>
  )
}

export default SelectYear