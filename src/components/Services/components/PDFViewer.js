import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { StyledViewer } from '../styles';

const PDFViewer = ({ src }) => {
  const [loading, setLoading] = useState(true);
  const hideSpinner = () => setLoading(false);

  return (
    <StyledViewer>
      {loading ? (
        <div className="d-flex align-items-center spinner-container justify-content-center">
          <Spinner animation="border" role="status" variant="primary" />
        </div>
      ) : null}
      <iframe
        src={src}
        width="100%"
        height="100%"
        onLoad={hideSpinner}
        frameBorder="0"
        marginHeight="0"
        title="Products and services"
        marginWidth="0"
      />
    </StyledViewer>
  );
};

export default PDFViewer;
