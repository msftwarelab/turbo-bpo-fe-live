import React, { useState, useEffect } from 'react';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import removeNull from 'utils/removeNull';
import moment from 'moment';
import pick from 'lodash/pick';
import { useQuery } from '@apollo/react-hooks';
import { Form, Table, Button } from 'react-bootstrap';
import DateRangeFilter from 'components/DateRangeFilter';
import Pagination from 'components/Pagination';
import UserSelect from 'components/UserSelect';
import conditionOptions from 'constants/conditionOptions';
import orderTypeOptions from 'constants/orderTypeOptions';
import getBiWeek from 'utils/getBiWeek';
import ALL_REQUEST from 'queries/allRequest';
import RemarksModal from 'components/RemarksModal';
import Submit from './components/Submit';
import SetConditionType from './components/SetConditionType';

const defaultValues = {
  offset: 0,
  limit: 20,
  type: 'INVOICE',
  dateFrom: getBiWeek().startDate,
  dateTo: getBiWeek().endDate,
  isPending: true,
  isPhoto: false,
  requestedById: null,
};

const RequestList = () => {
  const [filter, setFilter] = useState(defaultValues);
  const [allRequestData, setAllRequestData] = useState([]);

  const newFilter = { ...filter };
  if (filter.type === 'INVOICE') {
    delete newFilter.isPhoto;
  }

  const { loading, error, data = {} } = useQuery(ALL_REQUEST, {
    variables: {
      filter: {
        ...removeNull(newFilter),
      },
    },
    fetchPolicy: 'no-cache',
  });
  if (error) cogoToast.error(setErrorMessage(error));
  const { allRequest = {} } = data;
  const { totalCount = 0, results = [] } = allRequest;
  const pageCount = Math.ceil(totalCount / filter.limit);

  useEffect(() => {
    setAllRequestData(results.map(item => ({ ...item, action: null })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const handleDateFilter = e => {
    setFilter({
      ...filter,
      ...e,
    });
  };
  const handleCheckbox = name => {
    setFilter({
      ...filter,
      [name]: !filter[name],
    });
  };
  const handleFilter = e => {
    setFilter({
      ...filter,
      offset: e.selected * filter.limit,
    });
  };
  const handleClearFilter = () => {
    setFilter(defaultValues);
  };
  const handleChange = e => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };
  const handleRequestedBy = id => {
    setFilter({
      ...filter,
      requestedById: id,
    });
  };
  const handleConditionType = (requestData, e) => {
    const { value } = e.target;
    const newData = allRequestData.map(item => {
      if (item.id === requestData.id) {
        return {
          ...item,
          conditionType: value,
        };
      }
      return item;
    });
    setAllRequestData(newData);
  };

  const handleRequestType = (requestData, e) => {
    const { value } = e.target;
    const newData = allRequestData.map(item => {
      if (item.id === requestData.id) {
        return {
          ...item,
          type: value,
        };
      }
      return item;
    });
    setAllRequestData(newData);
  };

  const handleAction = (requestData, e) => {
    const { value } = e.target;
    const newData = allRequestData.map(item => {
      if (item.id === requestData.id && value !== '') {
        return {
          ...item,
          action: value,
        };
      }
      return item;
    });
    setAllRequestData(newData);
  };

  const handleUpdateAction = requestData => {
    const newData = allRequestData.map(item => {
      if (item.id === requestData.id) {
        return {
          ...item,
          action: null,
        };
      }
      return item;
    });
    setAllRequestData(newData);
  };

  const renderLoading = (
    <tr>
      <td colSpan={12} className="text-center">
        loading...
      </td>
    </tr>
  );
  const renderRow = allRequestData.length ? (
    allRequestData.map(item => (
      <tr key={item.id}>
        <td>{item.status}</td>
        <td>{item.orderNumber}</td>
        <td>{item.address}</td>
        <td>{item.company}</td>
        {filter.type === 'CONDITION' && (
          <>
            <td>
              <Form.Control
                as="select"
                value={item.conditionType}
                onChange={e => handleConditionType(item, e)}
              >
                {conditionOptions.map(option => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Control>
            </td>
            <td>
              {moment(item.createdDateTime).format('MMM DD YYYY, hh:mm A')}
            </td>
            <td className="text-center">
              <SetConditionType request={item} filter={removeNull(filter)} />
            </td>
          </>
        )}
        {filter.type === 'INVOICE' && (
          <>
            <td>
              <Form.Control
                as="select"
                value={item.orderType}
                onChange={e => handleRequestType(item, e)}
              >
                {orderTypeOptions.map(option => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Control>
            </td>
            <td>
              {moment(item.createdDateTime).format('MMM DD YYYY, hh:mm A')}
            </td>
            <td>{item.requestedBy}</td>
            <td>
              <RemarksModal remarks={item.remarks} />
            </td>
            <td>
              <Form.Control
                as="select"
                value={item.action || ''}
                onChange={e => handleAction(item, e)}
              >
                <option value="" />
                <option value="APPROVED">Approved</option>
                <option value="DECLINED">Declined</option>
              </Form.Control>
            </td>
            <td>
              <Submit
                request={item}
                onSubmit={handleUpdateAction}
                filter={removeNull(newFilter)}
              />
            </td>
          </>
        )}
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={12} className="text-center">
        No data yet...
      </td>
    </tr>
  );

  return (
    <>
      <div className="d-flex align-items-center mb-3">
        <div className="mr-2">
          <Form.Control
            as="select"
            name="type"
            onChange={handleChange}
            value={filter.type || ''}
          >
            <option value="INVOICE">Invoice</option>
          </Form.Control>
        </div>
        <div className="mr-2">
          <DateRangeFilter
            filter={pick(filter, ['dateFrom', 'dateTo'])}
            onChange={handleDateFilter}
          />
        </div>
        <div className="mr-2" style={{ width: 150 }}>
          <UserSelect
            returnValue="ID"
            onChange={handleRequestedBy}
            userRoles={['CONTRACTOR']}
            value={filter.requestedById || ''}
          />
        </div>
        <div className="mr-auto">
          <Button onClick={handleClearFilter}>Clear</Button>
        </div>
        <div>
          <Form.Check
            inline
            label="Pending"
            type="checkbox"
            checked={filter.isPending || false}
            onChange={() => handleCheckbox('isPending')}
          />
          {filter.type === 'CONDITION' && (
            <Form.Check
              inline
              label="Photo"
              type="checkbox"
              checked={filter.isPhoto || false}
              onChange={() => handleCheckbox('isPhoto')}
            />
          )}
        </div>
      </div>
      <Table bordered hover>
        <thead>
          <tr>
            <th className="text-center">Status</th>
            <th className="text-center">Order No.</th>
            <th className="text-center">Address</th>
            <th className="text-center">Company</th>
            {filter.type === 'CONDITION' && (
              <>
                <th className="text-center">Condition type</th>
                <th className="text-center">Create at</th>
              </>
            )}
            {filter.type === 'INVOICE' && (
              <>
                <th className="text-center">Type</th>
                <th className="text-center">Create at</th>
                <th className="text-center">Requested by</th>
                <th className="text-center">Remarks</th>
                <th className="text-center">Action</th>
              </>
            )}
            <th className="text-center">Submit</th>
          </tr>
        </thead>
        <tbody>{loading ? renderLoading : renderRow}</tbody>
      </Table>
      {allRequestData && allRequestData.length ? (
        <Pagination
          pageCount={pageCount}
          onPageChange={handleFilter}
          currentPage={filter.offset / filter.limit}
        />
      ) : null}
    </>
  );
};

export default RequestList;
