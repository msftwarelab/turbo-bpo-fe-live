import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';

const ProfileMenu = ({ handleModal }) => (
  <ButtonToolbar>
    <Button variant="primary mr-2" onClick={() => handleModal('PasswordModal')}>
      Password
    </Button>
    <Button variant="primary mr-2" onClick={() => handleModal('CommentsModal')}>
      Comments
    </Button>
    <Button
      variant="primary mr-2"
      onClick={() => handleModal('SearchCriteriaModal')}
    >
      Search Criteria
    </Button>
  </ButtonToolbar>
);

export default ProfileMenu;
