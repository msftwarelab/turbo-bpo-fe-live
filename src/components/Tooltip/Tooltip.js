import React, { useState, useRef } from 'react';
import { Tooltip as BTooltip, Overlay } from 'react-bootstrap';
import { StyledTitle } from './styles';

export const Tooltip = ({ title, disabled }) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const handleShow = () => {
    if (!disabled) setShow(!show);
  };

  return (
    <>
      <StyledTitle
        ref={target}
        onMouseEnter={handleShow}
        onMouseLeave={handleShow}
      >
        {title}
      </StyledTitle>
      <Overlay target={target.current} show={show} placement="right">
        {props => <BTooltip {...props}>{title}</BTooltip>}
      </Overlay>
    </>
  );
};

export default Tooltip;
