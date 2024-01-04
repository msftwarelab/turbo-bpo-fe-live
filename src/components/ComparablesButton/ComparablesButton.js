import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import DataEntryCompsModal from 'components/DataEntryCompsModal';

const ComparablesButton = ({ pipelineId }) => {
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);
  return (
    <>
      <Button onClick={handleShow}>Comparables</Button>
      {isShow && (
        <DataEntryCompsModal pipelineId={pipelineId} show onHide={handleShow} />
      )}
    </>
  );
};

export default ComparablesButton;
