import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import Pagination from 'components/Pagination';
import AnnouncementsTable from './components/AnnouncementsTable';
import ALL_ANNOUNCEMENT from 'queries/allAnnouncement';

const AnnouncementList = ({ filter, onChangeFilter }) => {
  const { loading, error, data = {} } = useQuery(ALL_ANNOUNCEMENT, {
    variables: {
      filter,
    },
  });
  if (error) cogoToast.error(setErrorMessage(error));
  const handleFilter = async e => {
    onChangeFilter({
      ...filter,
      offset: e.selected * filter.limit,
    });
  };

  const { allAnnouncement = {} } = data;
  const { totalCount = 0, results = [] } = allAnnouncement;
  const pageCount = Math.ceil(totalCount / filter.limit);
  return (
    <>
      <AnnouncementsTable loading={loading} data={results} filter={filter} />
      {results && results.length ? (
        <Pagination
          pageCount={pageCount}
          onPageChange={handleFilter}
          currentPage={filter.offset / filter.limit}
        />
      ) : null}
    </>
  );
};

export default AnnouncementList;
