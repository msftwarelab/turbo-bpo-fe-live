import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faFileArchive } from '@fortawesome/free-solid-svg-icons';
import { StyledContainer } from './styles';

const File = ({ src, onClose, disabled }) => {
  return (
    <StyledContainer>
      <Button size="sm" onClick={onClose} disabled={disabled}>
        <FontAwesomeIcon icon={faTimes} />
      </Button>
      <FontAwesomeIcon icon={faFileArchive} size="5x" />
    </StyledContainer>
  );
};

export default File;
