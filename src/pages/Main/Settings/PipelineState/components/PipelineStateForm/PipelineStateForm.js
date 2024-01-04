import React from 'react';
import { Formik } from 'formik';
import { shape, func, bool } from 'prop-types';
import { Form, Col, Row, Button, Card } from 'react-bootstrap';
import validationSchema from './validationSchema';

const PipelineStateForm = ({ initialValues, onSubmit, isLoading }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({
      handleSubmit,
      handleChange,
      setFieldValue,
      errors,
      touched,
      values,
    }) => {
      const handleSelect = e => {
        const { name, value } = e.target;
        setFieldValue(name, value === 'ENABLED');
      };

      return (
        <>
          <Form onSubmit={handleSubmit}>
            <Button
              type="submit"
              disabled={isLoading}
              variant="warning"
              className="mr-auto mb-3"
            >
              Save
            </Button>
            <Row>
              <Col sm={4}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>General</Card.Title>
                    <Form.Group as={Row}>
                      <Form.Label column sm="6">
                        Maximum Daily Volume
                      </Form.Label>
                      <Col sm="6">
                        <Form.Control
                          type="number"
                          name="maxDailyVolume"
                          onChange={handleChange}
                          value={values.maxDailyVolume || ''}
                          isInvalid={
                            errors.maxDailyVolume && touched.maxDailyVolume
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.maxDailyVolume}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="6">
                        Standby Auto Complete
                      </Form.Label>
                      <Col sm="6">
                        <Form.Control
                          type="number"
                          name="standByAutoComplete"
                          onChange={handleChange}
                          value={values.standByAutoComplete || ''}
                          isInvalid={
                            errors.standByAutoComplete &&
                            touched.standByAutoComplete
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.standByAutoComplete}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="6">
                        Rush
                      </Form.Label>
                      <Col sm="6">
                        <Form.Control
                          as="select"
                          name="isRush"
                          onChange={handleSelect}
                          value={values.isRush ? 'ENABLED' : 'DISABLED'}
                          isInvalid={errors.isRush && touched.isRush}
                        >
                          <option value="ENABLED">Enabled</option>
                          <option value="DISABLED">Disabled</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.isRush}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={4}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Orders</Card.Title>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        New Orders
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          as="select"
                          name="isRush"
                          onChange={handleSelect}
                          value={values.isNewOrder ? 'ENABLED' : 'DISABLED'}
                          isInvalid={errors.isNewOrder && touched.isNewOrder}
                        >
                          <option value="ENABLED">Enabled</option>
                          <option value="DISABLED">Disabled</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.isNewOrder}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column sm="3">
                        Message
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          as="textarea"
                          name="orderMessage"
                          onChange={handleChange}
                          value={values.orderMessage}
                          isInvalid={
                            errors.orderMessage && touched.orderMessage
                          }
                          rows="3"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.orderMessage}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={4}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Turnaround Time</Card.Title>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Slow:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="number"
                          name="tTSlow"
                          onChange={handleChange}
                          value={values.tTSlow || ''}
                          isInvalid={errors.tTSlow && touched.tTSlow}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.tTSlow}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Moderate:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="number"
                          name="tTModerate"
                          onChange={handleChange}
                          value={values.tTModerate || ''}
                          isInvalid={errors.tTModerate && touched.tTModerate}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.tTModerate}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Busy:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="number"
                          name="tTBusy"
                          onChange={handleChange}
                          value={values.tTBusy || ''}
                          isInvalid={errors.tTBusy && touched.tTBusy}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.tTBusy}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Maximum:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="number"
                          name="tTMax"
                          onChange={handleChange}
                          value={values.tTMax || ''}
                          isInvalid={errors.tTMax && touched.tTMax}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.tTMax}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={4}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Turbo Load</Card.Title>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Slow:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          name="tLSlow"
                          onChange={handleChange}
                          value={values.tLSlow || ''}
                          isInvalid={errors.tLSlow && touched.tLSlow}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.tLSlow}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Moderate:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          name="tLModerate"
                          onChange={handleChange}
                          value={values.tLModerate || ''}
                          isInvalid={errors.tLModerate && touched.tLModerate}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.tLModerate}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Busy:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          name="tLBusy"
                          onChange={handleChange}
                          value={values.tLBusy || ''}
                          isInvalid={errors.tLBusy && touched.tLBusy}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.tLBusy}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={4}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Order Pricing</Card.Title>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Interior:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="number"
                          name="oPInterior"
                          onChange={handleChange}
                          value={values.oPInterior || ''}
                          isInvalid={errors.oPInterior && touched.oPInterior}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.oPInterior}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Exterior:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="number"
                          name="oPExterior"
                          onChange={handleChange}
                          value={values.oPExterior || ''}
                          isInvalid={errors.oPExterior && touched.oPExterior}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.oPExterior}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Data Entry:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="number"
                          name="oPDataEntry"
                          onChange={handleChange}
                          value={values.oPDataEntry || ''}
                          isInvalid={errors.oPDataEntry && touched.oPDataEntry}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.oPDataEntry}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Rush:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="number"
                          name="oPRush"
                          onChange={handleChange}
                          value={values.oPRush || ''}
                          isInvalid={errors.oPRush && touched.oPRush}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.oPRush}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Super rush:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="number"
                          name="oPSuperRush"
                          onChange={handleChange}
                          value={values.oPSuperRush || ''}
                          isInvalid={errors.oPSuperRush && touched.oPSuperRush}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.oPSuperRush}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Condition Report:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="number"
                          name="oPConditionReport"
                          onChange={handleChange}
                          value={values.oPConditionReport || ''}
                          isInvalid={
                            errors.oPConditionReport &&
                            touched.oPConditionReport
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.oPConditionReport}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Rental Addendum:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="number"
                          name="oPRentalAddendum"
                          onChange={handleChange}
                          value={values.oPRentalAddendum || ''}
                          isInvalid={
                            errors.oPRentalAddendum && touched.oPRentalAddendum
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.oPRentalAddendum}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Initial BPO:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="number"
                          name="oPInitialBPO"
                          onChange={handleChange}
                          value={values.oPInitialBPO || ''}
                          isInvalid={
                            errors.oPInitialBPO && touched.oPInitialBPO
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.oPInitialBPO}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Inspection:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="number"
                          name="oPInspection"
                          onChange={handleChange}
                          value={values.oPInspection || ''}
                          isInvalid={
                            errors.oPInspection && touched.oPInspection
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.oPInspection}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={4}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Photo Contractor</Card.Title>
                    <Form.Group as={Row}>
                      <Form.Label column sm="6">
                        Accept Orders
                      </Form.Label>
                      <Col sm="6">
                        <Form.Control
                          as="select"
                          name="pCIsAcceptOrder"
                          onChange={handleSelect}
                          value={
                            values.pCIsAcceptOrder ? 'ENABLED' : 'DISABLED'
                          }
                          isInvalid={
                            errors.pCIsAcceptOrder && touched.pCIsAcceptOrder
                          }
                        >
                          <option value="ENABLED">Enabled</option>
                          <option value="DISABLED">Disabled</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.pCIsAcceptOrder}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="6">
                        Catch Time
                      </Form.Label>
                      <Col sm="6">
                        <Form.Control
                          type="number"
                          name="pCcatchTime"
                          onChange={handleChange}
                          value={values.pCcatchTime || ''}
                          isInvalid={errors.pCcatchTime && touched.pCcatchTime}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.pCcatchTime}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={4}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Order Assignment</Card.Title>
                    <Form.Group as={Row}>
                      <Form.Label column sm="6">
                        Offer limit in minutes
                      </Form.Label>
                      <Col sm="6">
                        <Form.Control
                          type="number"
                          name="oAOfferLimitInMin"
                          onChange={handleChange}
                          value={values.oAOfferLimitInMin || ''}
                          isInvalid={
                            errors.oAOfferLimitInMin &&
                            touched.oAOfferLimitInMin
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.oAOfferLimitInMin}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group>
                      <div className="my-2">
                        <Form.Check
                          inline
                          label="Auto Assignment"
                          type="checkbox"
                          id="oAIsAutoAssign"
                          checked={values.oAIsAutoAssign || false}
                          onChange={() =>
                            setFieldValue(
                              'oAIsAutoAssign',
                              !values.oAIsAutoAssign
                            )
                          }
                        />
                      </div>
                      <div className="text-secondary">
                        <i>
                          Auto assign solicits orders automatically based on
                          overall contractor ratings. The top rated Contractor
                          in the pipeline will receive an email to accept within
                          the set minutes. If order is not accepted within the
                          time limit, the solicitation cancels and is resent to
                          the next highest rated Contractor.
                        </i>
                      </div>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={4}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Quality Control</Card.Title>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Elapse time
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="number"
                          name="qCElapseTime"
                          onChange={handleChange}
                          value={values.qCElapseTime || ''}
                          isInvalid={
                            errors.qCElapseTime && touched.qCElapseTime
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.qCElapseTime}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Form>
        </>
      );
    }}
  </Formik>
);

PipelineStateForm.propTypes = {
  initialValues: shape({}),
  onSubmit: func,
  isLoading: bool,
};

PipelineStateForm.defaultProps = {
  initialValues: {},
  onSubmit: e => e,
  isLoading: false,
};

export default PipelineStateForm;
