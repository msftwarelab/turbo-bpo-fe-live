import React, { useState } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { useQuery } from '@apollo/react-hooks';
import setErrorMessage from 'utils/setErrorMessage';
import { Row, Col, Form, Table } from 'react-bootstrap';
import YearSelect from 'components/YearSelect';
import UserSelect from 'components/UserSelect';
import setCurrency from 'utils/setCurrency';
import { ALL_ORDER_ANALYTICS } from './queries';

const Orders = () => {
  const [filter, setFilter] = useState({
    client: undefined,
    year: moment().format('YYYY'),
  });
  const { loading, error, data = {} } = useQuery(ALL_ORDER_ANALYTICS, {
    variables: {
      filter,
    },
  });
  if (error) return <div>{setErrorMessage(error)}</div>;
  if (loading) return <div>loading...</div>;
  const handleYearFilter = e => {
    const { value } = e.target;
    setFilter({
      ...filter,
      year: value,
    });
  };
  const handleClientFilter = e => {
    setFilter({
      ...filter,
      client: e,
    });
  };
  const { allOrderAnalytics = [] } = data;
  const convertedData = _.chain(allOrderAnalytics)
    .groupBy('client')
    .map((value, key) => ({
      client: key,
      months: [...Array(12)].map((_, key) => {
        const month = key + 1;
        return {
          month,
          unpaid: 0,
          paid: 0,
          total: 0,
        };
      }),
    }))
    .value();
  console.log(convertedData, allOrderAnalytics);
  return (
    <div>
      <Row className="mb-3">
        <Col sm="6">
          <Form>
            <Form.Row>
              <Col>
                <YearSelect
                  name="year"
                  onChange={handleYearFilter}
                  value={filter.year || ''}
                />
              </Col>
              <Col>
                <UserSelect
                  userRoles={['CLIENT']}
                  onChange={handleClientFilter}
                  value={filter.client || ''}
                />
              </Col>
            </Form.Row>
          </Form>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th rowSpan="2">Client</th>
            {[...Array(12)].map((_, key) => {
              return (
                <th className="text-center" colSpan="3" key={key}>
                  {moment()
                    .month(key)
                    .format('MMMM')}
                </th>
              );
            })}
            <th rowSpan="2">Total</th>
          </tr>
          <tr>
            {[...Array(12)].map((_, key) => {
              return (
                <React.Fragment key={key}>
                  <th className="text-center text-danger">Unpaid</th>
                  <th className="text-center">Paid</th>
                  <th className="text-center">Total</th>
                </React.Fragment>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {convertedData.map(item => {
            let overAllTotal = 0;
            return (
              <tr>
                <td>{item.client}</td>
                {item.months.map((subItem, key) => {
                  overAllTotal += subItem.total;
                  return (
                    <React.Fragment key={key}>
                      <td className="text-danger">
                        {setCurrency('USD', subItem.unpaid, 2)}
                      </td>
                      <td>{setCurrency('USD', subItem.paid, 2)}</td>
                      <td>{setCurrency('USD', subItem.total, 2)}</td>
                    </React.Fragment>
                  );
                })}
                <td>{setCurrency('USD', overAllTotal, 2)}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th>Total: </th>
            {convertedData.length ? (
              [...Array(12)].map((_, key) => {
                const month = allOrderAnalytics.filter(
                  item => item.month === key + 1
                );
                return (
                  <>
                    <td>
                      {setCurrency(
                        'USD',
                        month
                          .map(item => item.unpaid)
                          .reduce((a, b) => a + b, 0),
                        2
                      )}
                    </td>
                    <td>
                      {setCurrency(
                        'USD',
                        month.map(item => item.paid).reduce((a, b) => a + b, 0),
                        2
                      )}
                    </td>
                    <td>
                      {setCurrency(
                        'USD',
                        month
                          .map(item => item.total)
                          .reduce((a, b) => a + b, 0),
                        2
                      )}
                    </td>
                  </>
                );
              })
            ) : (
              <td colSpan="36" />
            )}
            <td />
          </tr>
        </tfoot>
      </Table>
    </div>
  );
};

export default Orders;
