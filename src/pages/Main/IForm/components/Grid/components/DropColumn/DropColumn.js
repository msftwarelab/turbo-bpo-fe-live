import React from 'react';
import { useDrop } from 'react-dnd';
import { shape, oneOfType, arrayOf, string } from 'prop-types';
import { StyledCol, StyledOverlay } from './styles';

const DropColumn = ({ compareName, children }, ...props) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'box',
    drop: () => ({ name: compareName }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const isActive = canDrop && isOver;
  return (
    <StyledCol ref={drop} {...props}>
      {children}
      {isActive && <StyledOverlay>Release to drop</StyledOverlay>}
    </StyledCol>
  );
};

DropColumn.propTypes = {
  compareName: string,
  children: oneOfType([shape({}), arrayOf(shape({})), string]),
};
DropColumn.defaultProps = {
  compareName: null,
  children: {},
};

export default DropColumn;
