import React from 'react';
import { shape, func } from 'prop-types';
import PipelineQualityControlAndNoteList from 'components/PipelineQualityControlAndNoteList';

const PipelineNotes = ({ pipeline, filter, onChangeFilter }) => {
  const handleFilter = e => onChangeFilter(e);
  return (
    <div className="overflow-auto p-2">
      <PipelineQualityControlAndNoteList
        pipeline={pipeline}
        filter={filter}
        onChangeFilter={handleFilter}
      />
    </div>
  );
};

PipelineNotes.propTypes = {
  pipeline: shape({}),
  filter: shape({}),
  onChangeFilter: func,
};

PipelineNotes.defaultProps = {
  pipeline: {},
  filter: {},
  onChangeFilter: e => e,
};

export default PipelineNotes;
