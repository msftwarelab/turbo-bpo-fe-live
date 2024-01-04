import React from 'react';
import { Formik } from 'formik';
import { shape, func, bool } from 'prop-types';
import { Form, Button, Col, Row, Modal } from 'react-bootstrap';
import validationSchema from './validationSchema';
import AddCreditModal from '../AddCreditModal/AddCreditModal';

const PriceModuleForm = ({
  initialValues,
  onBlur,
  onSubmit,
  onClose,
  isLoading,
  onAddCredit,
  addedCredit,
}) => (
  <Formik
    enableReinitialize={true}
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ handleSubmit, handleChange, errors, touched, values }) => {
      return (
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Credits
              </Form.Label>
              <Row>
                <Col sm="8" className="ml-3">
                  <Form.Control
                    name="credits"
                    disabled
                    value={values.credits || 0}
                  />
                </Col>
                <AddCreditModal
                  isLoading={isLoading}
                  onAddCredit={onAddCredit}
                  addedCredit={addedCredit}
                />
              </Row>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Interior
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  name="orderinterior"
                  type="number"
                  placeholder="Enter interior"
                  onBlur={onBlur}
                  onChange={handleChange}
                  value={values.orderinterior || ''}
                  isInvalid={errors.orderinterior && touched.orderinterior}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.orderinterior}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Exterior
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  name="orderexterior"
                  type="number"
                  placeholder="Enter exterior"
                  onBlur={onBlur}
                  onChange={handleChange}
                  value={values.orderexterior || ''}
                  isInvalid={errors.orderexterior && touched.orderexterior}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.orderexterior}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Data entry
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  name="orderdataEntry"
                  type="number"
                  placeholder="Enter data entry"
                  onBlur={onBlur}
                  onChange={handleChange}
                  value={values.orderdataEntry || ''}
                  isInvalid={errors.orderdataEntry && touched.orderdataEntry}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.orderdataEntry}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Rush
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  name="orderrush"
                  type="number"
                  placeholder="Enter rush"
                  onBlur={onBlur}
                  onChange={handleChange}
                  value={values.orderrush || ''}
                  isInvalid={errors.orderrush && touched.orderrush}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.orderrush}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Super rush
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  name="ordersuperRush"
                  type="number"
                  placeholder="Enter super rush"
                  onBlur={onBlur}
                  onChange={handleChange}
                  value={values.ordersuperRush || ''}
                  isInvalid={errors.ordersuperRush && touched.ordersuperRush}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.ordersuperRush}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Condition Report
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  name="orderconditionReport"
                  type="number"
                  placeholder="Enter condition report"
                  onBlur={onBlur}
                  onChange={handleChange}
                  value={values.orderconditionReport || ''}
                  isInvalid={
                    errors.orderconditionReport && touched.orderconditionReport
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.orderconditionReport}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Rental Addendum
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  name="orderrentalAddendum"
                  type="number"
                  placeholder="Enter rental Addendum"
                  onBlur={onBlur}
                  onChange={handleChange}
                  value={values.orderrentalAddendum || ''}
                  isInvalid={
                    errors.orderrentalAddendum && touched.orderrentalAddendum
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.orderrentalAddendum}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Photo Exterior
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  name="photoExterior"
                  type="number"
                  placeholder="Enter Exterior"
                  onBlur={onBlur}
                  onChange={handleChange}
                  value={values.photoExterior || ''}
                  isInvalid={errors.photoExterior && touched.photoExterior}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.photoExterior}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Interior (Vacant LB)
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  name="photoInteriorVacantLB"
                  type="number"
                  placeholder="Enter Interior"
                  onBlur={onBlur}
                  onChange={handleChange}
                  value={values.photoInteriorVacantLB || ''}
                  isInvalid={
                    errors.photoInteriorVacantLB &&
                    touched.photoInteriorVacantLB
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.photoInteriorVacantLB}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Interior (Appointment)
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  name="photoInteriorAppointment"
                  type="number"
                  placeholder="Enter Interior"
                  onBlur={onBlur}
                  onChange={handleChange}
                  value={values.photoInteriorAppointment || ''}
                  isInvalid={
                    errors.photoInteriorAppointment &&
                    touched.photoInteriorAppointment
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.photoInteriorAppointment}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" variant="warning" disabled={isLoading}>
              Save changes
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </Modal.Footer>
        </Form>
      );
    }}
  </Formik>
);

PriceModuleForm.propTypes = {
  initialValues: shape({}),
  onSubmit: func,
  onClose: func,
  isLoading: bool,
};

PriceModuleForm.defaultProps = {
  initialValues: {},
  onSubmit: e => e,
  onClose: e => e,
  isLoading: false,
};

export default PriceModuleForm;
