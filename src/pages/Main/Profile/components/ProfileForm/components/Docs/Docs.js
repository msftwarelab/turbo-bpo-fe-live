import React, { useState } from 'react';
import AddDoc from './components/AddDoc';
import DocList from './components/DocList';

const Docs = () => {
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
  });
  const handleFilter = filter => setFilter(filter);
  return (
    <>
      <div className="text-right mb-2">
        <AddDoc filter={filter} />
      </div>
      <DocList filter={filter} onChangeFilter={handleFilter} />
    </>
  );
};

export default Docs;
