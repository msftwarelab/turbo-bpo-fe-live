import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import MonthSelect from 'components/MonthSelect';
import YearSelect from 'components/YearSelect';
import MonthlyOrderList from './components/MonthlyOrderList';
import moment from 'moment';

const MonthlyOrders = () => {
  const [filter, setFilter] = useState({
    month: 9,
    year: moment().format('YYYY'),
  });

  const handleFilter = e => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  return (
    <div className="border-bottom-0 border p-3 bg-white">
      <Row className="mb-3">
        <Col sm="6">
          <Form>
            <Form.Row>
              <Col>
                <YearSelect
                  name="year"
                  onChange={handleFilter}
                  value={filter.year || ''}
                />
              </Col>
              <Col>
                <MonthSelect
                  name="month"
                  onChange={handleFilter}
                  value={filter.month || ''}
                />
              </Col>
            </Form.Row>
          </Form>
        </Col>
      </Row>
      <MonthlyOrderList filter={filter} />
    </div>
  );
};

export default MonthlyOrders;
