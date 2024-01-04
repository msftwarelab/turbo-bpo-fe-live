import React from 'react';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import { useQuery } from '@apollo/react-hooks';
import ALL_ANNOUNCEMENT from 'queries/allAnnouncement';
import AnnouncementModal from 'components/AnnouncementModal/AnnouncementModal';

const Announcement = () => {
  const localStorageData = localStorage.getItem('announcementRead');
  let announcementRead = localStorageData ? JSON.parse(localStorageData) : [];
  const { error, data = [] } = useQuery(ALL_ANNOUNCEMENT, {
    variables: {
      filter: {
        isActive: true,
      },
    },
  });

  const { allAnnouncement = {} } = data;
  const { results = [] } = allAnnouncement;

  const handleReadAnnouncement = (announcementId) => {
    announcementRead = [
      ...announcementRead,
      announcementId
    ];
    localStorage.setItem('announcementRead', JSON.stringify(announcementRead));
  };

  if (error) cogoToast.error(setErrorMessage(error));
  return (
    <>
      {results.map((item, key) => (
        <AnnouncementModal
          key={item.id}
          wait={(key + 1) * 1000}
          show={!announcementRead.includes(item.id)}
          subject={item.subject}
          message={item.message}
          onRead={() => handleReadAnnouncement(item.id)}
        />
      ))}
    </>
  );
};

export default Announcement;
