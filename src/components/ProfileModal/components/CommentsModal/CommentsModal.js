import React, { useState } from 'react'
import { Modal, Button, Form, Row, Col, Container  } from 'react-bootstrap';
import { StyledModal } from './styles'

const CommentsModal = ({ modalName, handleModal }) => {

  const hideModal  = () =>  handleModal('')
  
  return (
      modalName === 'CommentsModal' && (
      <StyledModal show size="lg" onHide={hideModal}>
         <StyledModal.Header closeButton>
           <StyledModal.Title>Comments</StyledModal.Title>
         </StyledModal.Header>
         <StyledModal.Body>
         <Container>
            <fieldset class="border p-2">
               <legend  class="w-auto">Poor</legend>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                   Poor:
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                   Fair:
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                   Average:
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                   Good:
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                   Excelent:
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
            </fieldset>

            <fieldset class="border p-2">
               <legend  class="w-auto">Neighborhood Description</legend>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                   SFD:
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                   Townhouse:
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                   Condo:
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                   Multi Unit:
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                   Mobile Home:
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                   Non-Conformity:
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
            </fieldset>

            <fieldset class="border p-2">
               <legend  class="w-auto">Positive Comments</legend>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                   Curb Appeal:
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                   Cul-de-sac:
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                   Maintenance:
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                   Landscaping:
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                   Conformity:
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                   External Effect:
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                   Newer Build(2000 or newer):
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
            </fieldset>

            <fieldset class="border p-2">
               <legend  class="w-auto">Negative Comments</legend>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                  Crime:
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                   Obsolescence:
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                   Non-Conformity:
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                   External Effect:
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                   Airport:
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                   Highway:
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                   Main Thoroughfare:
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                  Railroad:
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                  Unemployment:
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
            </fieldset>

            <fieldset class="border p-2">
               <legend  class="w-auto">Missing Photos</legend>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                  Gated Community:
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                   No Address Visible:
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
            </fieldset>



            <fieldset class="border p-2">
               <legend  class="w-auto">Broker Comments</legend>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                  REO Driven:
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                   Short Sale Driven:
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                  Distressed Market(REO&&SS)
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                 Fair Market (All):
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                   Slow Market (HIGH DOM):
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                   Fast Market (LOW DOM):
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                   Declining1 (LP Under SP):
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                 Declining2 (Surplus):
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                 Stable3 (Moderate Demand):
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                 Increasing1 (Majority FM):
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                 Increasing2 (Shortage):
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                 Increasing3 (In Demand):
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
            </fieldset>

            <fieldset class="border p-2">
               <legend  class="w-auto">Others</legend>
               <Form.Group as={Row} controlId="formLastName">
                 <Form.Label column sm="3">
                  Disclaimer:
                 </Form.Label>
                 <Col sm="9">
                   <Form.Control as="textarea" rows="2" />
                 </Col>
               </Form.Group>
            </fieldset>


         </Container>
         </StyledModal.Body>
      </StyledModal>
    )
  )
}

export default CommentsModal