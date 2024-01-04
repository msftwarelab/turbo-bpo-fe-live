import React from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import { useMe } from 'contexts/Me';
import { bool, arrayOf, shape, func } from 'prop-types';
import QualityControlHistory from 'components/QualityControlHistory';
import AssignQualityControl from '../../../AssignQualityControl';
import SelfAssignQualityControl from '../../../AssignQualityControl/SelfAssignQualityControl';

const QualityControlTable = ({
  loading,
  data,
  qualityControlFilter,
  onShowDetail,
}) => {
  const { me } = useMe();
  const renderRow = data.length ? (
    data.map(item => (
      <tr key={item.id}>
        <td>
          {me.permissionList.includes('VIEW_QUALITY_CONTROL_DETAILS') ||
          item.assigneeId === me.id ? (
            <a href="#/" onClick={() => onShowDetail(item)}>
              {item.id}
            </a>
          ) : (
            <div>{item.id}</div>
          )}
          {(me.permissionList.includes('VIEW_QUALITY_CONTROL_ADDRESS') ||
            me.id === item.assigneeId) && <div>{item.address}</div>}
        </td>
        <td>{item.requests}</td>
        <td>{moment(item.createdDateTime).format('MMM DD YYYY, hh:mm A')}</td>
        <td>{item.status}</td>
        <td>
          {item.LastUpdateTime
            ? moment(item.LastUpdateTime).format('MMM DD YYYY, hh:mm A')
            : ''}
        </td>
        <td>{item.assignee || 'Pending'}</td>
        <td className="text-center">
          <QualityControlHistory data={item.history} />
        </td>
        {me.permissionList.includes('CAN_ASSIGN_ORDER') && (
          <td>
            <AssignQualityControl
              qualityControl={item}
              qualityControlFilter={qualityControlFilter}
            />
          </td>
        )}
        {me.roles.includes('QUALITY_CONTROL') && (
          <td>
            <SelfAssignQualityControl
              qualityControl={item}
              qualityControlFilter={qualityControlFilter}
            />
          </td>
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

  const renderLoading = (
    <tr>
      <td colSpan={16} className="text-center">
        loading...
      </td>
    </tr>
  );
  return (
    <div className="overflow-auto">
      <Table bordered hover>
        <thead>
          <tr>
            <th className="text-center">QC ID</th>
            <th className="text-center">Requests</th>
            <th className="text-center">Creation Time</th>
            <th className="text-center">Status</th>
            <th className="text-center">Elapsed Time</th>
            <th className="text-center">Assignee</th>
            <th className="text-center">History</th>
            {me.permissionList.includes('CAN_ASSIGN_ORDER') && (
              <th className="text-center" />
            )}
          </tr>
        </thead>
        <tbody>{loading ? renderLoading : renderRow}</tbody>
      </Table>
    </div>
  );
};

QualityControlTable.defaultProps = {
  loading: false,
  data: [],
  qualityControlFilter: {},
  onShowDetail: e => e,
};

QualityControlTable.propTypes = {
  loading: bool,
  data: arrayOf(shape({})),
  qualityControlFilter: shape({}),
  onShowDetail: func,
};

export default QualityControlTable;
