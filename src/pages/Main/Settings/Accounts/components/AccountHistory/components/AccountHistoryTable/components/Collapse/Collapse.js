import React, { useState } from 'react';
import prettyjson from 'prettyjson';
import { Button, Collapse as BCollapse } from 'react-bootstrap';

const Collapse = ({ value }) => {
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);
  return (
    <>
      <Button variant="link" onClick={handleShow} className="p-0">
        {!isShow ? 'Show' : 'Hide'} logs
      </Button>
      <BCollapse in={isShow}>
        <pre>{prettyjson.render(JSON.parse(value))}</pre>
      </BCollapse>
    </>
  );
};

export default Collapse;
