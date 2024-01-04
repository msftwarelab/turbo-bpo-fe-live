import React from 'react';
import { Formik } from 'formik';
import { shape, func, bool } from 'prop-types';
import Datetime from 'react-datetime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import setCurrency from 'utils/setCurrency';
import { Form, Modal, Button, Col, Table } from 'react-bootstrap';
import validationSchema from './validationSchema';
import AddBillingEntry from '../AddBillingEntry';

const BillingForm = ({ initialValues, onSubmit, onClose, isLoading }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {({
        handleSubmit,
        setFieldValue,
        handleChange,
        errors,
        touched,
        values,
      }) => {
        const handleBillingEntry = e => {
          const entry = e;
          if (e.type === 'REFUND') entry.amount = -e.amount;
          setFieldValue('entries', [...values.entries, entry]);
        };
        const handleRemoveEntryOptions = e => {
          setFieldValue(
            'entries',
            values.entries.filter(item => item.orderNumber !== e.orderNumber)
          );
        };
        return (
          <>
            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                <Form.Row>
                  <Col sm="3">
                    <Form.Group>
                      Invoice No.
                      <Form.Control
                        name="invoiceNumber"
                        placeholder="Enter invoice number"
                        onChange={handleChange}
                        value={values.invoiceNumber || ''}
                        isInvalid={
                          touched.invoiceNumber && errors.invoiceNumber
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.invoiceNumber}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col sm="3">
                    <Form.Group>
                      Date From
                      <Datetime
                        onChange={e =>
                          setFieldValue('dateFrom', e.format('YYYY-MM-DD'))
                        }
                        value={values.dateFrom}
                        inputProps={{
                          className: 'form-control bg-white',
                          placeholder: 'Date From',
                          readOnly: true,
                        }}
                        closeOnSelect
                        timeFormat={false}
                      />
                      {errors.dateFrom && touched.dateFrom && (
                        <div className="text-danger">
                          <small>{errors.dateFrom}</small>
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col sm="3">
                    <Form.Group>
                      Date To
                      <Datetime
                        onChange={e =>
                          setFieldValue('dateTo', e.format('YYYY-MM-DD'))
                        }
                        value={values.dateTo}
                        inputProps={{
                          className: 'form-control bg-white',
                          placeholder: 'Date To',
                          readOnly: true,
                        }}
                        closeOnSelect
                        timeFormat={false}
                      />
                      {errors.dateTo && touched.dateTo && (
                        <div className="text-danger">
                          <small>{errors.dateTo}</small>
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col sm="3">
                    <Form.Group>
                      Date
                      <Datetime
                        onChange={e =>
                          setFieldValue('date', e.format('YYYY-MM-DD'))
                        }
                        value={values.date}
                        inputProps={{
                          className: 'form-control bg-white',
                          placeholder: 'Date',
                          readOnly: true,
                        }}
                        closeOnSelect
                        timeFormat={false}
                      />
                      {errors.date && touched.date && (
                        <div className="text-danger">
                          <small>{errors.date}</small>
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col sm="3">
                    <Form.Group>
                      Due Date
                      <Datetime
                        onChange={e =>
                          setFieldValue('dueDate', e.format('YYYY-MM-DD'))
                        }
                        value={values.dueDate}
                        inputProps={{
                          className: 'form-control bg-white',
                          placeholder: 'Due date',
                          readOnly: true,
                        }}
                        closeOnSelect
                        timeFormat={false}
                      />
                      {errors.dueDate && touched.dueDate && (
                        <div className="text-danger">
                          <small>{errors.dueDate}</small>
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col className="text-right">
                    <div className="mt-4">
                      <AddBillingEntry onSubmit={handleBillingEntry} />
                    </div>
                  </Col>
                </Form.Row>
                <Table striped bordered hover className="mb-0">
                  <thead>
                    <tr>
                      <th>Order No.</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th className="text-center" width="5%">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {values.entries.map(item => (
                      <tr key={item.orderNumber}>
                        <td>{item.orderNumber}</td>
                        <td>{item.description}</td>
                        <td className="text-right">
                          {setCurrency('USD', item.amount, 2)}
                        </td>
                        <td
                          className={
                            item.status === 'PAID'
                              ? 'text-success'
                              : 'text-warning'
                          }
                        >
                          {item.status}
                        </td>
                        <td className="text-center">
                          <Button
                            onClick={() => handleRemoveEntryOptions(item)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan="2" className="text-right">
                        Total
                      </th>
                      <th className="text-right">
                        {setCurrency(
                          'USD',
                          values.entries.length
                            ? values.entries
                                .map(item =>
                                  item.amount ? parseFloat(item.amount) : 0
                                )
                                .reduce((a, b) => a + b)
                            : 0,
                          2
                        )}
                      </th>
                      <th />
                      <th />
                    </tr>
                  </tfoot>
                </Table>
                <div>
                  {errors.entries && touched.entries && (
                    <div className="text-danger">
                      <small>{errors.entries}</small>
                    </div>
                  )}
                </div>
              </Modal.Body>

              <Modal.Footer>
                <Button type="submit" variant="warning" disabled={isLoading}>
                  Save
                </Button>
                <Button variant="primary" onClick={onClose}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};

BillingForm.propTypes = {
  initialValues: shape({}),
  onSubmit: func,
  onClose: func,
  isLoading: bool,
};

BillingForm.defaultProps = {
  initialValues: {},
  onSubmit: e => e,
  onClose: e => e,
  isLoading: false,
};

export default BillingForm;
