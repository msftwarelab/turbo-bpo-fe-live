import React, { useState } from 'react';
import AccountList from './components/AccountList';
import AddAccount from './components/AddAccount';
import Search from './components/Search';

const Accounts = () => {
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
  });
  const handleFilter = filter => setFilter(filter);
  return (
    <>
      <div className="mb-3 d-flex">
        <div className="mr-2">
          <AddAccount filter={filter} />
        </div>
        <Search
          filter={filter}
          onSearch={handleFilter}
          onReset={handleFilter}
        />
      </div>
      <AccountList filter={filter} onChangeFilter={handleFilter} />
    </>
  );
};

export default Accounts;
