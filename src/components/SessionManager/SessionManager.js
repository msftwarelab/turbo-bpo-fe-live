import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Datetime from 'react-datetime';
import moment from 'moment';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useMe } from 'contexts/Me';
import SessionList from 'components/SessionList';
import SessionStart from 'components/SessionStart';
import SessionStop from 'components/SessionStop';
import UserSelect from 'components/UserSelect';
import { StyledDateContainer } from './styles';

const SessionManager = () => {
  const { me } = useMe();
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
    userId: me.id,
    dateFrom: moment()
      .startOf('month')
      .format('YYYY-MM-DD'),
    dateTo: moment()
      .endOf('month')
      .format('YYYY-MM-DD'),
  });
  const handleFilter = async e => {
    setFilter({
      ...filter,
      offset: e.selected * filter.limit,
    });
  };
  const [input, setInput] = useState({
    userId: me.id,
    invoiceDate: null,
  });

  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);

  const handleOpenLinkShow = e => {
    e.preventDefault();
    handleShow();
  };

  const handleFromDateChange = value => {
    setFilter({
      ...filter,
      dateFrom: moment(value).format('YYYY-MM-DD'),
    });
  };

  const handleToDateChange = value => {
    setFilter({
      ...filter,
      dateTo: moment(value).format('YYYY-MM-DD'),
    });
  };

  const handleInvoiceDateChange = value => {
    setInput({
      ...input,
      invoiceDate: moment(value).format('YYYY-MM-DD'),
    });
  };

  const handleUserSelect = value => {
    setInput({
      ...input,
      userId: value,
    });
    setFilter({
      ...filter,
      userId: value,
    });
  };

  return (
    <>
      <Link className="menu-item" to="#/" onClick={handleOpenLinkShow}>
        <FontAwesomeIcon icon={faClock} />
        <span className="title">Session Manager</span>
      </Link>
      {isShow && (
        <Modal size="lg" show onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Session Manager</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col sm="12">
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    Contractor
                  </Form.Label>
                  <Col sm="4">
                    <UserSelect
                      onChange={handleUserSelect}
                      userRoles={['CONTRACTOR', 'REVIEWER', 'QUALITY_CONTROL']}
                      value={filter.userId || ''}
                    />
                  </Col>
                  <Col sm="4" className="d-flex">
                    <div className="mr-2 d-flex">
                      <SessionStart input={input} filter={filter} />
                    </div>
                    <SessionStop userId={input.userId} filter={filter} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    From
                  </Form.Label>
                  <Col sm="3" className="pr-0">
                    <StyledDateContainer>
                      <Datetime
                        value={
                          filter.dateFrom
                            ? moment(filter.dateFrom).format('YYYY-MM-DD')
                            : ''
                        }
                        onChange={handleFromDateChange}
                        inputProps={{
                          className: 'form-control',
                          placeholder: 'From Date',
                        }}
                        closeOnSelect
                        timeFormat={false}
                      />
                      <span className="calendarIcon">
                        <FontAwesomeIcon icon={faCalendar} />
                      </span>
                    </StyledDateContainer>
                  </Col>
                  <Col sm="1" className="d-flex align-items-center justify-content-center">
                    To
                  </Col>
                  <Col sm="3" className="pl-0">
                    <StyledDateContainer>
                      <Datetime
                        value={
                          filter.dateTo
                            ? moment(filter.dateTo).format('YYYY-MM-DD')
                            : ''
                        }
                        onChange={handleToDateChange}
                        inputProps={{
                          className: 'form-control',
                          placeholder: 'To Date',
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
                    Invoice Date (PH)
                  </Form.Label>
                  <Col sm="4">
                    <StyledDateContainer>
                      <Datetime
                        value={
                          input.invoiceDate
                            ? moment(input.invoiceDate).format('YYYY-MM-DD')
                            : ''
                        }
                        onChange={handleInvoiceDateChange}
                        inputProps={{
                          className: 'form-control',
                          placeholder: 'Select date',
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
              </Col>
            </Row>
            <SessionList filter={filter} onChangeFilter={handleFilter} />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleShow}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default SessionManager;
