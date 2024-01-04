import React from 'react';
import { Image as BImage, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { StyledContainer } from './styles';

const Image = ({ src, onClose, disabled }) => {
  return (
    <StyledContainer>
      <Button size="sm" onClick={onClose} disabled={disabled}>
        <FontAwesomeIcon icon={faTimes} />
      </Button>
      <BImage src={src} fluid />
    </StyledContainer>
  );
};

export default Image;
