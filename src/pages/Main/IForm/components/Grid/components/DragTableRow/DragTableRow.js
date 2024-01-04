import React from 'react';
import { useDrag } from 'react-dnd';
import { shape, oneOfType, arrayOf, string, func } from 'prop-types';
import cogoToast from 'cogo-toast';

const listCompOptions = ['ListComp1', 'ListComp2', 'ListComp3'];

const DragTableRow = ({ iformGrid, children, onDrop }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { iformGrid, type: 'box' },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (
        dropResult &&
        listCompOptions.includes(dropResult.name) &&
        iformGrid.status !== 'ACTIVE'
      ) {
        cogoToast.error(`ListComp1's status needs to be ACTIVE`);
        return false;
      }
      if (item && dropResult) {
        onDrop({
          iformGrid,
          compare: dropResult.name,
        });
      }
      return false;
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.4 : 1;
  return (
    <tr ref={drag} style={{ opacity }}>
      {children}
    </tr>
  );
};

DragTableRow.propTypes = {
  iformGrid: shape({}),
  onDrop: func,
  children: oneOfType([shape({}), arrayOf(shape({})), string]),
};
DragTableRow.defaultProps = {
  iformGrid: {},
  children: {},
  onDrop: e => e,
};

export default DragTableRow;
