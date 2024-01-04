import React, { useState } from 'react';
import {
  Button,
  Form,
  Row,
  Col,
  Container,
  ButtonToolbar,
} from 'react-bootstrap';

import { StyledModal } from './styles';
import PasswordModal from './components/PasswordModal';
import CommentsModal from './components/CommentsModal';
import SearchCriteriaModal from './components/SearchCriteriaModal';
import ProfileMenu from './components/ProfileMenu';
import ProfileForm from './components/ProfileForm';

const ProfileModal = ({ show, handleShow }) => {
  const [modal, setModal] = useState('');
  const handleModal = name => setModal(name);

  return (
    <>
      <PasswordModal modalName={modal} handleModal={handleModal} />
      <CommentsModal modalName={modal} handleModal={handleModal} />
      <SearchCriteriaModal modalName={modal} handleModal={handleModal} />
      {show && (
        <StyledModal show size="lg" onHide={handleShow}>
          <StyledModal.Header closeButton>
            <StyledModal.Title>
              <strong className="mb-3 d-block">David Kemery</strong>
              <ProfileMenu handleModal={handleModal} />
            </StyledModal.Title>
          </StyledModal.Header>
          <StyledModal.Body>
            <Container>
              <ProfileForm />
            </Container>
          </StyledModal.Body>
        </StyledModal>
      )}
    </>
  );
};

export default ProfileModal;
