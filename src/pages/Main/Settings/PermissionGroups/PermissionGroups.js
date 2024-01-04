import React, { useState } from 'react';
import { useMe } from 'contexts/Me'
import NewPermissionGroup from './components/NewPermissionGroup';
import PermissionGroupList from './components/PermissionGroupList';

const PermissionGroups = () => {
  const { me } = useMe();
 
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
  });
  const handleFilter = e => {
    setFilter({
      ...filter,
      offset: e.selected * filter.limit,
    });
  };
  return (
    <>
      <div className="mb-3 d-flex">
         { me.permissionList.includes('CREATE_PERMISSION') && (
            <div className="mr-2">
            <NewPermissionGroup filter={filter} />
          </div>
         )}
      </div>
      <PermissionGroupList filter={filter} onChangeFilter={handleFilter} />
    </>
  );
};

export default PermissionGroups;
