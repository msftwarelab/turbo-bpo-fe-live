import React, { useEffect } from 'react';
import { Table, Col, Form, Button } from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import { useMe } from 'contexts/Me';
import setCurrency from 'utils/setCurrency';
import Pagination from 'components/Pagination';
import { shape, func } from 'prop-types';
import cogoToast from 'cogo-toast';
import DeleteBilling from 'components/DeleteBilling';
import setErrorMessage from 'utils/setErrorMessage';
import ALL_BILLING from 'queries/allBilling';
import Payment from 'components/Payment';
import ChangeBillingStatus from 'components/ChangeBillingStatus';
import ChangeBillingIssueDate from 'components/ChangeBillingIssueDate';
import ChangeBillingDueDate from 'components/ChangeBillingDueDate';
import BillingModal from '../BillingModal';

const BillingsList = ({ filter, onChangeFilter }) => {
  const { me } = useMe();
  const { loading, error, data = {}, refetch } = useQuery(ALL_BILLING, {
    variables: {
      filter,
    },
    fetchPolicy: 'network-only',
  });
  if (error) cogoToast.error(setErrorMessage(error));
  useEffect(() => {
    const { allBilling = {} } = data;
    const { results = [] } = allBilling;
    let found = false;
    if (!me.roles.includes('ADMIN')) {
      results.forEach(item => {
        if (
          moment().diff(item.dueDate) > 0 &&
          item.status === 'PENDING' &&
          !found
        ) {
          cogoToast.error(
            'Overdue invoice. will not allow new orders until invoice is paid'
          );
          found = true;
        }
      });
    }
  }, [data, me]);
  const handleFilter = async e => {
    onChangeFilter({
      ...filter,
      offset: e.selected * filter.limit,
    });
  };
  const { allBilling = {} } = data;
  const { totalCount = 0, results = [] } = allBilling;
  const pageCount = Math.ceil(totalCount / filter.limit);
  let orderTotal = 0;
  let paidAmount = 0;
  let balanceAmount = 0;
  results.forEach(item => {
    const itemTotal = item.entries
      .map(entry => entry.amount)
      .reduce((a, b) => a + b, 0);
    orderTotal += itemTotal;
    paidAmount += item.status === 'PAID' ? itemTotal : 0;
    balanceAmount += item.status !== 'PAID' ? itemTotal : 0;
  });
  const renderLoading = (
    <tr>
      <td colSpan={10} className="text-center">
        loading...
      </td>
    </tr>
  );
  const handleRefresh = () => {
    refetch();
  };
  const renderRow = results.length ? (
    results.map(item => {
      const totalAmount = item.entries
        .map(entry => entry.amount)
        .reduce((a, b) => a + b, 0);
      return (
        <tr key={item.id}>
          <td>
            <BillingModal billing={item} filter={filter} />
          </td>
          {!me.roles.includes('CLIENT') && <td>{item.userName}</td>}
          <td>
            {me.permissionList.includes('UPDATE_BILLING') ? (
              <ChangeBillingIssueDate billing={item} filter={filter} />
            ) : (
              moment(item.date).format('MMM DD YYYY')
            )}
          </td>
          <td>
            {me.permissionList.includes('UPDATE_BILLING') ? (
              <ChangeBillingDueDate billing={item} filter={filter} />
            ) : (
              moment(item.dueDate).format('MMM DD YYYY')
            )}
          </td>
          <td>
            {moment(item.dateFrom).format('MMM DD YYYY')} to{' '}
            {moment(item.dateTo).format('MMM DD YYYY')}
          </td>
          <td className="text-right">{setCurrency('USD', totalAmount, 2)}</td>
          <td>
            {me.permissionList.includes('UPDATE_BILLING') &&
            item.status !== 'DELETED' ? (
              <ChangeBillingStatus billing={item} filter={filter} />
            ) : (
              item.status
            )}
          </td>
          {me.roles.includes('CLIENT') && (
            <td className="text-center">
              {item.status !== 'PAID' && item.status !== 'DELETED' ? (
                <Payment
                  billingId={item.id}
                  amount={totalAmount}
                  filter={filter}
                />
              ) : (
                ''
              )}
            </td>
          )}
          {me.permissionList.some(permission =>
            ['DELETE_BILLING', 'UPDATE_BILLING'].includes(permission)
          ) && (
            <td className="text-center">
              {me.permissionList.includes('DELETE_BILLING') && (
                <DeleteBilling billing={item} filter={filter} />
              )}
            </td>
          )}
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan={10} className="text-center">
        No data yet...
      </td>
    </tr>
  );
  return (
    <Form.Row>
      <Col>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Invoice</th>
              {!me.roles.includes('CLIENT') && <th>Client</th>}
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Period</th>
              <th className="text-right">Total</th>
              <th width="5%">Status</th>
              {me.roles.includes('CLIENT') && (
                <th className="text-center">Pay Now</th>
              )}
              {me.permissionList.some(permission =>
                ['DELETE_BILLING', 'UPDATE_BILLING'].includes(permission)
              ) && <th className="text-center">Actions</th>}
            </tr>
          </thead>
          <tbody>{loading ? renderLoading : renderRow}</tbody>
        </Table>
        {results && results.length ? (
          <Pagination
            pageCount={pageCount}
            onPageChange={handleFilter}
            currentPage={filter.offset / filter.limit}
          />
        ) : null}
      </Col>
      {me.roles.includes('CLIENT') && (
        <Col>
          <Table bordered striped hover>
            <thead>
              <tr>
                <th colSpan="2">
                  <Button size="sm" onClick={handleRefresh} disabled={loading}>
                    Refresh
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Order Total</td>
                <td className="text-primary">
                  {setCurrency('USD', orderTotal, 2)}
                </td>
              </tr>
              <tr>
                <td>Balance</td>
                <td className="text-primary">
                  {setCurrency('USD', balanceAmount, 2)}
                </td>
              </tr>
              <tr>
                <td>Refund/Surcharge</td>
                <td className="text-primary">-</td>
              </tr>
              <tr>
                <td>Paid Amount</td>
                <td className="text-primary">
                  {setCurrency('USD', paidAmount, 2)}
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      )}
    </Form.Row>
  );
};
BillingsList.propTypes = {
  filter: shape({}),
  onChangeFilter: func,
};
BillingsList.defaultProps = {
  filter: {},
  onChangeFilter: e => e,
};
export default BillingsList;
