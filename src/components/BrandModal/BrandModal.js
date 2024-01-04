import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { StyledBrand } from './styles';

const BrandModal = () => {
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);
  return (
    <>
      <StyledBrand onClick={handleShow}>Turbo BPO</StyledBrand>
      {isShow && (
        <Modal show onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Turbo BPO</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>
              <b>Site:</b> Turbo-BPO.com <br />
              <b>Version:</b> 4 <br />
              <b>Error logs:</b> coming soon <br />
            </p>
            <p>
              <b>Address:</b> 19046 Bruce B. Downs Blvd. Ste #796 <br />
              Tampa, FL 33647
            </p>
            <p>
              <b>CHAT SUPPORT</b> <br />
              Tawk <br />
              24/7
            </p>
            <p>
              <b>EMAIL SUPPORT</b> <br />
              team@turbo-bpo.com <br />
              24/7
            </p>
            <p>
              <b>PHONE SUPPORT</b> <br />
              888-517-TBPO <br />
              Mon-Fri 9am-5pm (EST)
            </p>
            <p>
              <b>COLOR KEYGEN</b> <br />
              <Button variant="danger">{' '}</Button> Late/Hold <br />
              <Button variant="warning">{' '}</Button> Rush <br />
              <Button className="bg-yellow">{' '}</Button> Standby <br />
              <Button variant="success">{' '}</Button> Complete/Paid <br />
              <Button variant="primary">{' '}</Button> Active with Photos <br />
              <Button style={{ backgroundColor: '#800080' }}>{' '}</Button> QC <br />
            </p>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default BrandModal;
