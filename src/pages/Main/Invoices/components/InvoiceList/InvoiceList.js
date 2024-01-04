import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import moment from 'moment';
import _ from 'lodash';
import removeNull from 'utils/removeNull';
import ExportInvoices from 'components/ExportInvoices';
import setErrorMessage from 'utils/setErrorMessage';
import cogoToast from 'cogo-toast';
import { useQuery } from '@apollo/react-hooks';
import UserSelect from 'components/UserSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlusSquare,
  faMinusSquare,
  faTimes,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import DateRangeFilter from 'components/DateRangeFilter';
import ALL_INVOICE from 'queries/allInvoice';
import getBiWeek from 'utils/getBiWeek';
import EditInvoice from 'components/EditInvoice';
import DeclineInvoice from 'components/DeclineInvoice';
import ChangeInvoiceOrderType from 'components/ChangeInvoiceOrderType';
import ChangeInvoiceQCType from 'components/ChangeInvoiceQCType';

const InvoiceList = () => {
  const [filter, setFilter] = useState({
    dateFrom: getBiWeek().startDate,
    dateTo: getBiWeek().endDate,
    employeeId: null,
    isCancelled: false,
  });
  const { loading, error, data = {} } = useQuery(ALL_INVOICE, {
    variables: {
      filter: removeNull(filter),
    },
  });
  if (error) cogoToast.error(setErrorMessage(error));
  const { allInvoice = [] } = data;

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
  const handleUserChange = e => {
    setFilter({
      ...filter,
      employeeId: e,
    });
  };

  const [allInvoiceData, setAllInvoiceData] = useState([]);

  useEffect(() => {
    if (allInvoice.length) {
      setAllInvoiceData(
        _.chain(allInvoice)
          .groupBy('name')
          .map((value, key) => ({ name: key, orders: value, isShow: false }))
          .value()
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allInvoice]);

  const handleSubItem = item => {
    const newData = allInvoiceData.map(dataItem => {
      if (item.name === dataItem.name) {
        return {
          ...dataItem,
          isShow: !dataItem.isShow,
        };
      }
      return dataItem;
    });
    setAllInvoiceData(newData);
  };

  const handleClearFilter = () => {
    setFilter({
      dateFrom: null,
      dateTo: null,
      employeeId: null,
      isCancelled: false,
    });
  };

  return (
    <>
      <div className="d-flex align-items-center mb-3">
        <div className="mr-2">
          <DateRangeFilter
            filter={{
              dateFrom: filter.dateFrom,
              dateTo: filter.dateTo,
            }}
            onChange={handleDateFilter}
          />
        </div>
        <div className="mr-2" style={{ width: 150 }}>
          <UserSelect
            userRoles={['CONTRACTOR', 'QUALITY_CONTROL']}
            value={filter.employeeId}
            onChange={handleUserChange}
          />
        </div>
        <div className="mr-auto">
          <Button onClick={handleClearFilter}>Clear</Button>
          <span className="ml-2">
            <ExportInvoices
              data={allInvoice}
              fileName={`Invoices${moment().unix()}`}
            />
          </span>
        </div>
        <div>
          <Form.Check
            inline
            label="Cancelled"
            type="checkbox"
            checked={filter.isCancelled || false}
            onChange={() => handleCheckbox('isCancelled')}
          />
        </div>
      </div>
      <div className="overflow-auto">
        <Table bordered hover>
          <thead>
            <tr>
              <th className="text-center">Type</th>
              <th className="text-center">Date</th>
              <th className="text-center">Order No.</th>
              <th className="text-center">Address</th>
              <th className="text-center">Company</th>
              <th className="text-center">Client</th>
              <th className="text-center">Order Type</th>
              <th className="text-center">Super rush</th>
              <th className="text-center">Rush</th>
              <th className="text-center">Interior</th>
              <th className="text-center">Rental Addendum</th>
              <th className="text-center">Initial BPO</th>
              <th className="text-center">Inspection</th>
              <th className="text-center">No CSV</th>
              <th className="text-center">No iFill</th>
              <th className="text-center">Other Premium</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={17} className="text-center">
                  loading...
                </td>
              </tr>
            ) : (
              allInvoiceData.map(item => (
                <React.Fragment key={item.name}>
                  <tr>
                    <td colSpan="17" className="p-0">
                      <Button
                        size="sm"
                        variant="link"
                        className="text-left p-2"
                        block
                        onClick={() => handleSubItem(item)}
                      >
                        <b>
                          <FontAwesomeIcon
                            icon={item.isShow ? faMinusSquare : faPlusSquare}
                            className="mr-1"
                          />{' '}
                          {item.name} ({item.orders.length})
                        </b>
                      </Button>
                    </td>
                  </tr>
                  {item.isShow && (
                    <>
                      {item.orders.map(subItem => (
                        <tr key={subItem.id}>
                          <td>{subItem.type}</td>
                          <td>
                            {moment(subItem.date).format(
                              'MMM DD YYYY, hh:mm A'
                            )}
                          </td>
                          <td>{subItem.orderNumber}</td>
                          <td>{subItem.address}</td>
                          <td>{subItem.company}</td>
                          <td>{subItem.client}</td>
                          <td>
                            {subItem.type === 'QC' ? (
                              <ChangeInvoiceQCType
                                invoice={subItem}
                                filter={filter}
                              />
                            ) : (
                              <ChangeInvoiceOrderType
                                invoice={subItem}
                                filter={filter}
                              />
                            )}
                          </td>
                          <td className="text-center">
                            {subItem.isSuperRush ? (
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="text-success"
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faTimes}
                                className="text-warning"
                              />
                            )}
                          </td>
                          <td className="text-center">
                            {subItem.isRush ? (
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="text-success"
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faTimes}
                                className="text-warning"
                              />
                            )}
                          </td>
                          <td className="text-center">
                            {subItem.isInterior ? (
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="text-success"
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faTimes}
                                className="text-warning"
                              />
                            )}
                          </td>
                          <td className="text-center">
                            {subItem.isRentalAddendum ? (
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="text-success"
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faTimes}
                                className="text-warning"
                              />
                            )}
                          </td>
                          <td className="text-center">
                            {subItem.isInitialBpo ? (
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="text-success"
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faTimes}
                                className="text-warning"
                              />
                            )}
                          </td>
                          <td className="text-center">
                            {subItem.isInspection ? (
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="text-success"
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faTimes}
                                className="text-warning"
                              />
                            )}
                          </td>
                          <td className="text-center">
                            {subItem.isNoCsv ? (
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="text-success"
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faTimes}
                                className="text-warning"
                              />
                            )}
                          </td>
                          <td className="text-center">
                            {subItem.isNoIFill ? (
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="text-success"
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faTimes}
                                className="text-warning"
                              />
                            )}
                          </td>
                          <td className="text-center">
                            {subItem.isOtherPremium ? (
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="text-success"
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faTimes}
                                className="text-warning"
                              />
                            )}
                          </td>
                          <td>
                            {subItem.type !== 'SUBMIT' && (
                              <>
                                <EditInvoice
                                  invoice={subItem}
                                  filter={removeNull(filter)}
                                />{' '}
                                <DeclineInvoice
                                  invoice={subItem}
                                  filter={removeNull(filter)}
                                />
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default InvoiceList;
