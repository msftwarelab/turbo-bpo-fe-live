import React from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import DataEntryCompsMenu from 'components/DataEntryCompsMenu';
import UsernamePasswordMenu from 'components/UsernamePasswordMenu';

const PipelineContextMenu = () => (
  <>
    <ContextMenu id="PIPELINE_CONTEXTMENU">
      <DataEntryCompsMenu />
      <MenuItem>Print BPO | CMA</MenuItem>
      <UsernamePasswordMenu />
    </ContextMenu>
  </>
);

export default PipelineContextMenu;
