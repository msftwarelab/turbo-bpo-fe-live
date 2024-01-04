import React, { useState } from 'react';
import HeaderList from './components/HeaderList';
import AddHeader from './components/AddHeader';
import Search from './components/Search';

const Headers = () => {
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
  });
  const handleFilter = filter => setFilter(filter);
  return (
    <>
      <div className="mb-3 d-flex">
        <div className="mr-2">
          <AddHeader filter={filter} />
        </div>
        <Search
          filter={filter}
          onSearch={handleFilter}
          onReset={handleFilter}
        />
      </div>
      <HeaderList filter={filter} onChangeFilter={handleFilter} />
    </>
  );
};

export default Headers;
