import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import CompanyCustomSelect from 'components/CompanyCustomSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Datetime from 'react-datetime';
import { shape, func } from 'prop-types';
import removeEmptyString from 'utils/removeEmptyString';
import removeNull from 'utils/removeNull';
import moment from 'moment';
import UserSelect from 'components/UserSelect';
import { useMe } from 'contexts/Me';
import orderTypeOptions from 'constants/orderTypeOptions';
import orderStatusOptions, { activeArray } from 'constants/orderStatusOptions';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { StyledDateContainer } from './styles';
import { useModalStatus } from 'contexts/ModalStatus';

const Search = ({ filter, onSearch, onReset }) => {
  const { me } = useMe();
  const { setModalOpen } = useModalStatus();
  const [values, setValues] = useState(filter);
  const [isShow, setShow] = useState(false);
  const handleShow = () => {
    setShow(!isShow);
    setModalOpen(!isShow);
  };
  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleStatusChange = e => {
    const { value } = e.target;
    setValues({
      ...values,
      status: [value],
    });
  };

  const handleCompanyChange = e => {
    setValues({
      ...values,
      company: e.name,
    });
  };

  const setContractor = id => {
    setValues({
      ...values,
      assignId: id,
    });
  };

  const setReviewer = id => {
    setValues({
      ...values,
      reviewerUserId: id,
    });
  };

  const setQc = id => {
    setValues({
      ...values,
      qcUserId: id,
    });
  };

  const setAssign = id => {
    setValues({
      ...values,
      authorId: id,
    });
  };

  const handleDateChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    let newValues = values;
    if (
      values.status &&
      values.status.length &&
      (values.status[0] === 'ALL' || values.status[0] === '')
    ) {
      newValues = {
        ...newValues,
        status: null,
      };
    } else if (
      values.status &&
      values.status.length &&
      values.status[0] === 'ACTIVE'
    ) {
      newValues = {
        ...newValues,
        status: activeArray,
      };
    } else {
      newValues = {
        ...newValues,
        status: values.status,
      };
    }

    onSearch(removeEmptyString(removeNull(newValues)));
    handleShow();
  };
  const handleReset = () => {
    setValues({
      offset: values.offset,
      limit: values.limit,
    });
    onReset({
      offset: values.offset,
      limit: values.limit,
    });
  };

  useEffect(() => {
    setValues(filter);
  }, [filter]);

  const handleScroll = () => {
    document.getElementById('modalBottom').scrollIntoView();
  };

  console.log(['this is', window]);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Search
      </Button>
      {isShow && (
        <Modal show onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Search</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  Order number
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    name="orderNumber"
                    value={values.orderNumber || ''}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  Address
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    name="address"
                    value={values.address || ''}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  County
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    name="country"
                    value={values.country || ''}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>
              {me.permissionList.includes(
                'SHOW_CONTRACTOR_FIELD_ON_SEARCH'
              ) && (
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    Contractor
                  </Form.Label>
                  <Col sm="9">
                    <UserSelect
                      returnValue="ID"
                      onChange={id => setContractor(id)}
                      userRoles={['CONTRACTOR']}
                      value={values.assignId || ''}
                    />
                  </Col>
                </Form.Group>
              )}
              {me.permissionList.includes('SHOW_REVIEWER_FIELD_ON_SEARCH') && (
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    Reviewer
                  </Form.Label>
                  <Col sm="9">
                    <UserSelect
                      returnValue="ID"
                      onChange={id => setReviewer(id)}
                      userRoles={['REVIEWER']}
                      value={values.reviewerUserId || ''}
                    />
                  </Col>
                </Form.Group>
              )}
              {me.permissionList.includes('SHOW_QC_FIELD_ON_SEARCH') && (
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    QC
                  </Form.Label>
                  <Col sm="9">
                    <UserSelect
                      returnValue="ID"
                      onChange={id => setQc(id)}
                      userRoles={['QUALITY_CONTROL']}
                      value={values.qcUserId || ''}
                    />
                  </Col>
                </Form.Group>
              )}
              {!me.roles.includes('CLIENT') && (
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    Client
                  </Form.Label>
                  <Col sm="9">
                    <UserSelect
                      returnValue="ID"
                      onChange={id => setAssign(id)}
                      userRoles={['CLIENT']}
                      value={values.authorId || ''}
                    />
                  </Col>
                </Form.Group>
              )}

              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  Company
                </Form.Label>
                <Col sm="9">
                  <CompanyCustomSelect
                    name="company"
                    value={values.company || ''}
                    onChange={handleCompanyChange}
                    placeholder="Select company"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  Order type
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    as="select"
                    name="orderType"
                    onChange={handleChange}
                    value={values.orderType || ''}
                  >
                    <option value="">All</option>
                    {orderTypeOptions.map((item, key) => (
                      <option key={key} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  Order status
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    as="select"
                    name="status"
                    onChange={handleStatusChange}
                    value={values.status || ''}
                  >
                    <option value="">All</option>
                    {orderStatusOptions.map((item, key) => (
                      <option key={key} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  Date from:
                </Form.Label>
                <Col sm="9">
                  <StyledDateContainer>
                    <Datetime
                      menuPlacement="top"
                      value={
                        values.dateFrom
                          ? moment(values.dateFrom).format('YYYY-MM-DD')
                          : ''
                      }
                      onChange={e =>
                        handleDateChange('dateFrom', e.format('YYYY-MM-DD'))
                      }
                      inputProps={{
                        className: 'form-control',
                        placeholder: 'Date from',
                        onClick: handleScroll,
                      }}
                      closeOnSelect
                      timeFormat={false}
                    />
                    <span className="calendarIcon">
                      <FontAwesomeIcon icon={faCalendar} />
                    </span>
                  </StyledDateContainer>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  Date to:
                </Form.Label>
                <Col sm="9">
                  <StyledDateContainer>
                    <Datetime
                      value={
                        values.dateTo
                          ? moment(values.dateTo).format('YYYY-MM-DD')
                          : ''
                      }
                      onChange={e =>
                        handleDateChange('dateTo', e.format('YYYY-MM-DD'))
                      }
                      inputProps={{
                        className: 'form-control',
                        placeholder: 'Date to',
                        onClick: handleScroll,
                      }}
                      closeOnSelect
                      timeFormat={false}
                    />
                    <span className="calendarIcon">
                      <FontAwesomeIcon icon={faCalendar} />
                    </span>
                  </StyledDateContainer>
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="primary" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="primary" onClick={handleShow}>
              Close
            </Button>
          </Modal.Footer>
          <div id="modalBottom" />
        </Modal>
      )}
    </div>
  );
};

Search.propTypes = {
  filter: shape({}),
  onSearch: func,
  onReset: func,
};

Search.defaultProps = {
  filter: {},
  onSearch: e => e,
  onReset: e => e,
};

export default Search;
