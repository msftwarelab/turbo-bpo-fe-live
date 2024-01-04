import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import PDFViewer from './components/PDFViewer';
import { Link } from 'react-router-dom';
import { StyledContainer, StyledModal } from './styles';

const Services = () => {
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);
  return (
    <>
      <Link className="menu-item" to="#" onClick={handleShow}>
        <FontAwesomeIcon icon={faTools} />
        <span className="title">Services</span>
      </Link>
      {isShow && (
        <StyledModal show onHide={handleShow} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Products, Services and Fees </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <StyledContainer>
              <PDFViewer src="https://turbo-bpo.s3.ap-southeast-1.amazonaws.com/media/pdf/Turbo_BPO_Services_2020.pdf" />
            </StyledContainer>
          </Modal.Body>

          <Modal.Footer>
            <Button className="mt-3" onClick={handleShow}>
              Close
            </Button>
          </Modal.Footer>
        </StyledModal>
      )}
    </>
  );
};

export default withRouter(Services);
