import React, { useState } from 'react';
import AnnouncementList from './components/AnnouncementList';
import AddAnnouncement from './components/AddAnnouncement';
import Search from './components/Search';

const Announcements = () => {
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
  });
  const handleFilter = filter => setFilter(filter);
  return (
    <>
      <div className="mb-3 d-flex">
        <div className="mr-2">
          <AddAnnouncement filter={filter} />
        </div>
        <Search
          filter={filter}
          onSearch={handleFilter}
          onReset={handleFilter}
        />
      </div>
      <AnnouncementList filter={filter} onChangeFilter={handleFilter} />
    </>
  );
};

export default Announcements;
