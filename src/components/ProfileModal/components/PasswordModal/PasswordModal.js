import React, { useState } from 'react'
import { Modal, Button, Form, Row, Col, Container, Table  } from 'react-bootstrap';
import { StyledModal } from './styles'

const PasswordModal = ({ modalName, handleModal }) => {

  const hideModal  = () =>  handleModal('')
  
  return (
      modalName === 'PasswordModal' && (
      <StyledModal show size="lg" onHide={hideModal}>
         <StyledModal.Header closeButton>
           <StyledModal.Title>Denver Kemery| Username and Password</StyledModal.Title>
         </StyledModal.Header>
         <StyledModal.Body>
         <Container>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Company.</th>
                  <th>Website</th>
                  <th>Username</th>
                  <th>Password</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PROTECT</td>
                  <td>http://www.google.com</td>
                  <td>dkemery</td>
                  <td>May1974</td>
                </tr>
              </tbody>
            </Table>
         </Container>
         </StyledModal.Body>
      </StyledModal>
    )
  )
}

export default PasswordModal