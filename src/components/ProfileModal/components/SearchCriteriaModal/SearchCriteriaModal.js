import React, { useState } from 'react'
import { Modal, Button, Form, Row, Col, Container  } from 'react-bootstrap';

const SearchCriteriaModal = ({ modalName, handleModal }) => {

  const hideModal  = () =>  handleModal('')
  
  return (
      modalName === 'SearchCriteriaModal' && (
      <Modal show size="lg" onHide={hideModal}>
         <Modal.Header closeButton>
           <Modal.Title>Password</Modal.Title>
         </Modal.Header>
         <Modal.Body>
         <Container>
            <h2>SearchCriteriaModal</h2>
         </Container>
         </Modal.Body>
      </Modal>
    )
  )
}

export default SearchCriteriaModal