import React, { useState } from 'react';
import CompanyList from './components/CompanyList';
import AddCompany from './components/AddCompany';
import Search from './components/Search';

const Companies = () => {
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
  });
  const handleFilter = newFilter => setFilter(newFilter);
  return (
    <>
      <div className="mb-3 d-flex">
        <div className="mr-2">
          <AddCompany filter={filter} />
        </div>
        <Search
          filter={filter}
          onSearch={handleFilter}
          onReset={handleFilter}
        />
      </div>
      <CompanyList filter={filter} onChangeFilter={handleFilter} />
    </>
  );
};

export default Companies;
