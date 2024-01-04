import React from 'react';
import { string, oneOfType, shape, arrayOf } from 'prop-types';
import { ContextMenuTrigger } from 'react-contextmenu';

const PipelineContextMenu = ({ pipelineId, children, className, disable }) => {
  return (
    <ContextMenuTrigger
      renderTag="tr"
      pipelineId={pipelineId}
      id="PIPELINE_CONTEXTMENU"
      holdToDisplay={1000}
      attributes={{ className }}
      collect={props => ({ pipelineId: props.pipelineId })}
      disable={disable}
    >
      {children}
    </ContextMenuTrigger>
  );
};

PipelineContextMenu.propTypes = {
  children: oneOfType([shape({}), arrayOf(shape({})), string]),
  pipelineId: string,
  className: string,
};

PipelineContextMenu.defaultProps = {
  children: {},
  pipelineId: null,
  className: '',
};

export default PipelineContextMenu;
