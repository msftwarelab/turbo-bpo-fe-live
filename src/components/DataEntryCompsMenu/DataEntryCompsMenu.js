import React, { useState } from 'react';
import { MenuItem } from 'react-contextmenu';
import DataEntryCompsModal from 'components/DataEntryCompsModal';

const DataEntryCompsMenu = () => {
  const [pipelineId, setPipelineId] = useState(null);
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);
  const handleClick = (_, data) => {
    setPipelineId(data.pipelineId);
    handleShow();
  };
  return (
    <>
      <MenuItem onClick={handleClick}>Data Entry Comps</MenuItem>
      {isShow && (
        <DataEntryCompsModal pipelineId={pipelineId} show onHide={handleShow} />
      )}
    </>
  );
};

export default DataEntryCompsMenu;
