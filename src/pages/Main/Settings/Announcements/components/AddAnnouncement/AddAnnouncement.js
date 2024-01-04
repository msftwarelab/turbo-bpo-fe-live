import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import { withApollo } from 'react-apollo';
import { Modal, Button } from 'react-bootstrap';
import setErrorMessage from 'utils/setErrorMessage';
import { shape } from 'prop-types';
import SAVE_ANNOUNCEMENT from 'mutations/saveAnnouncement';
import ALL_ANNOUNCEMENT from 'queries/allAnnouncement';
import AnnouncementForm from '../AnnouncementForm';

const AddAnnouncement = ({ client, filter }) => {
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleShow = () => setShow(!isShow);

  const handleSubmit = async input => {
    setLoading(true);
    try {
      const {
        data: { saveAnnouncement },
      } = await client.mutate({
        mutation: SAVE_ANNOUNCEMENT,
        variables: {
          input,
        },
        refetchQueries: [
          {
            query: ALL_ANNOUNCEMENT,
            variables: { filter },
          },
        ],
      });
      setLoading(false);
      if (saveAnnouncement) cogoToast.success('Announcement created');
      else cogoToast.error(setErrorMessage());
      handleShow();
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
      handleShow();
    }
  };

  return (
    <>
      <Button onClick={handleShow} variant="warning" className="mr-auto">
        Add Notification
      </Button>
      <Modal show={isShow} onHide={handleShow} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Notification</Modal.Title>
        </Modal.Header>

        <AnnouncementForm
          form="announcementForm"
          initialValues={{
            subject: null,
            startDate: null,
            endDate: null,
            message: null,
          }}
          onSubmit={handleSubmit}
          onClose={handleShow}
          isLoading={isLoading}
        />
      </Modal>
    </>
  );
};

AddAnnouncement.propTypes = { client: shape({}), filter: shape({}) };
AddAnnouncement.defaultProps = { client: {}, filter: {} };

export default withApollo(AddAnnouncement);
