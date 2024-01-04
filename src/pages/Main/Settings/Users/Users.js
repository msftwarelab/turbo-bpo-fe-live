import React, { useState } from 'react';
import RolesSelect from 'components/RolesSelect';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import Search from './components/Search';

const Users = () => {
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
    roles: ['CLIENT'],
  });
  const handleFilter = newFilter => setFilter(newFilter);
  const handleRoleSelect = e =>
    setFilter({
      ...filter,
      roles: [e.value],
    });
  return (
    <>
      <div className="mb-3 d-flex">
        <div className="mr-2" style={{ width: 150 }}>
          <RolesSelect value={filter.role} onChange={handleRoleSelect} />
        </div>
        <div className="mr-2">
          <AddUser filter={filter} />
        </div>
        <Search
          filter={filter}
          onSearch={handleFilter}
          onReset={handleFilter}
        />
      </div>
      <UserList filter={filter} onChangeFilter={handleFilter} />
    </>
  );
};

export default Users;
