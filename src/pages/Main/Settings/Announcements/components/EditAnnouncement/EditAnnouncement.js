import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import { withApollo } from 'react-apollo';
import { Button, Modal } from 'react-bootstrap';
import removeNull from 'utils/removeNull';
import setErrorMessage from 'utils/setErrorMessage';
import pick from 'lodash/pick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import UPDATE_ANNOUNCEMENT from 'mutations/updateAnnouncement';
import ALL_ANNOUNCEMENT from 'queries/allAnnouncement';
import AnnouncementForm from '../AnnouncementForm';

const EditAnnouncement = ({ announcement, client, filter }) => {
  const [isShow, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleShow = () => setShow(!isShow);

  const handleSubmit = async data => {
    setLoading(true);
    const input = { ...removeNull(data) };
    delete input.id;
    try {
      const {
        data: { updateAnnouncement },
      } = await client.mutate({
        mutation: UPDATE_ANNOUNCEMENT,
        variables: {
          id: announcement.id,
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
      if (updateAnnouncement) cogoToast.success('Announcement updated');
      else cogoToast.error(setErrorMessage());
      handleShow();
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
      handleShow();
    }
  };

  const initialValues = pick(announcement, [
    'subject',
    'message',
    'startDate',
    'endDate',
  ]);

  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>
        <FontAwesomeIcon icon={faEdit} />
      </Button>
      <Modal show={isShow} onHide={handleShow} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Notification</Modal.Title>
        </Modal.Header>
        <AnnouncementForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onClose={handleShow}
          isLoading={isLoading}
          isEdit
        />
      </Modal>
    </>
  );
};

export default withApollo(EditAnnouncement);
