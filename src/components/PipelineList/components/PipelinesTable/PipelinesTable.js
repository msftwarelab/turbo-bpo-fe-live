import React from 'react';
import { Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import setCurrency from 'utils/setCurrency';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { arrayOf, shape, func, bool } from 'prop-types';
import { faLaptop } from '@fortawesome/free-solid-svg-icons';
import RatingsModal from 'components/RatingsModal';
import { useMe } from 'contexts/Me';
import { useRightClickDisabled } from 'contexts/RightClickDisabled';
import PipelineDocsModal from 'components/PipelineDocsModal';
import PipelinePhotosModal from 'components/PipelinePhotosModal';
import PipelineQualityControlsModal from 'components/PipelineQualityControlsModal';
import PipelineNotesModal from 'components/PipelineNotesModal';
import AssignPipelineModal from 'components/AssignPipelineModal';
import ProcessPipelineModal from 'components/ProcessPipelineModal';
import PipelineAuthorModal from 'components/PipelineAuthorModal';
import PipelineContextMenu from 'components/PipelineContextMenu';
import PipelineStatus from 'components/PipelineStatus';

import PipelineContextMenuTrigger from 'components/PipelineContextMenuTrigger';
import { StylesOrderType, StyledDiv, StyledTbody } from './styles';

momentDurationFormatSetup(moment);

const PipelinesTable = ({
  loading,
  data,
  onEdit,
  pipelineFilter,
  onAllSelectedPipeline = e => e,
  onSelectPipeline = e => e,
  selectedPipeline = [],
}) => {
  const { me } = useMe();
  const { isRightClickDisabled } = useRightClickDisabled();
  const getTimeDiff = (dateTime1, dateTime2) => {
    const first = !dateTime1 ? moment() : moment(dateTime1);
    const second = !dateTime2 ? moment() : moment(dateTime2);
    const ms = first.diff(second);
    const d = moment.duration(ms);
    return {
      time: d.format('HH:mm'),
      ms,
    };
  };
  const renderLoading = (
    <tr>
      <td colSpan={14} className="text-center">
        loading...
      </td>
    </tr>
  );
  const renderRow = data.length ? (
    data.map(item => {
      let timeUnit = ' hrs';
      let timeDiff =
        getTimeDiff(item.dueDateTime).ms <= 0 && item.status !== 'ACTIVE'
          ? '-'
          : getTimeDiff(item.dueDateTime).time;
      let calculatedDue = item.dueDateTime ? timeDiff : '-';

      if (item.isHold) {
        timeDiff = getTimeDiff(item.dueDateTime, item.holdDateTime).time;
        calculatedDue = item.dueDateTime && item.holdDateTime ? timeDiff : '-';
      }

      if (item.status !== 'ACTIVE') {
        timeDiff = getTimeDiff(item.dueDateTime, item.pauseDateTime).time;
        calculatedDue = item.dueDateTime && item.pauseDateTime ? timeDiff : '-';
      }
      if (!timeDiff.includes(':')) timeUnit = ' mins';
      if (calculatedDue === '-') timeUnit = '';
      const dueDateTime = `${calculatedDue + timeUnit}`;

      let { status } = item;

      let statusClass = '';
      if (item.isQc === true) {
        status = 'QC';
        statusClass = 'text-warning';
      } else if (item.isRushOrder) {
        status = 'RUSH';
        statusClass = 'text-warning';
      } else if (item.isSuperRush) {
        status = 'SUPER RUSH';
        statusClass = 'text-warning';
        console.log(dueDateTime);
      } else if (status === 'CANCELLED' || status === 'CANCEL') {
        status = 'CANCELLED';
      } else if (status === 'ACTIVE') {
        status = 'ACTIVE';
        statusClass = 'text-primary';
      } else if (status === 'STANDBY') {
        status = 'STANDBY';
        statusClass = 'text-yellow';
      } else if (status === 'QC') {
        status = 'QC';
      } else if (status === 'LATE') {
        status = 'LATE';
        statusClass = 'text-danger';
      } else if (item.isHold) {
        status = 'HOLD';
        statusClass = 'text-danger';
      }

      const assignName = !item.assignId ? 'Pending' : item.assign;

      return (
        <PipelineContextMenuTrigger
          key={item.id}
          pipelineId={item.id}
          disable={isRightClickDisabled}
        >
          <td>
            <Form.Group>
              <Form.Check
                type="checkbox"
                checked={selectedPipeline
                  .map(select => select.id)
                  .includes(item.id)}
                onChange={() => onSelectPipeline(item)}
              />
            </Form.Group>
          </td>
          <td>
            <a href="#/" onClick={() => onEdit(item)} className="order-number">
              {item.orderNumber}
            </a>{' '}
            {!me.roles.includes('CLIENT') && !me.roles.includes('ADMIN') && (
              <>
                <br />
                {moment(item.createdDateTime).format('MMM DD YYYY, hh:mm A')}
              </>
            )}
            {me.permissionList.includes('SHOW_CLIENT_INFO_PIPELINE') && (
              <>
                <br /> <PipelineAuthorModal pipeline={item} />
              </>
            )}
          </td>
          <td className="address">
            {item.address}, {item.zipCode}
            <br />
            {item.country}
          </td>
          <td>
            {item.companyId === 'OTHERS' ? item.premiumCompany : item.company}
            <StylesOrderType>{item.orderType}</StylesOrderType>
          </td>
          <td>
            {me.permissionList.includes('ASSIGN_PIPELINE_ORDER') ? (
              <AssignPipelineModal
                pipeline={item}
                pipelineFilter={pipelineFilter}
              />
            ) : (
              <>
                <b>{assignName}</b>
                <br />
              </>
            )}
            {moment(item.createdDateTime).format('MMM DD YYYY, hh:mm A')}
          </td>
          <td>
            <div className={statusClass}>
              <PipelineStatus status={status} pipeline={item} />
            </div>
            Due: {dueDateTime}
          </td>
          {me.permissionList.includes('SHOW_PIPELINE_FEE') && (
            <td>
              {setCurrency('USD', item.orderFee, 2)}
              <br />{' '}
              <RatingsModal pipeline={item} pipelineFilter={pipelineFilter} />
            </td>
          )}
          {me.permissionList.includes('SHOW_PIPELINE_PROCESS') && (
            <td className="text-center">
              <ProcessPipelineModal
                pipeline={item}
                pipelineFilter={pipelineFilter}
              />
            </td>
          )}
          {me.permissionList.includes('SHOW_PIPELINE_QC') && (
            <td className="text-center">
              <PipelineQualityControlsModal
                pipeline={item}
                pipelineFilter={pipelineFilter}
              />
            </td>
          )}
          {me.permissionList.includes('SHOW_PIPELINE_NOTES') && (
            <td className="text-center">
              <PipelineNotesModal
                pipeline={item}
                pipelineFilter={pipelineFilter}
              />
            </td>
          )}
          {me.permissionList.includes('SHOW_PIPELINE_DOCS') && (
            <td className="text-center">
              <PipelineDocsModal
                pipeline={item}
                pipelineFilter={pipelineFilter}
              />
            </td>
          )}
          {me.permissionList.includes('SHOW_PIPELINE_PHOTOS') && (
            <td className="text-center">
              <PipelinePhotosModal
                pipeline={item}
                pipelineFilter={pipelineFilter}
              />
            </td>
          )}
          {me.permissionList.includes('SHOW_PIPELINE_IFORM') && (
            <td className="text-center">
              <a
                href={`iform/${item.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLaptop} />
              </a>
            </td>
          )}
        </PipelineContextMenuTrigger>
      );
    })
  ) : (
    <tr>
      <td colSpan={14} className="text-center">
        No data yet...
      </td>
    </tr>
  );

  return (
    <StyledDiv>
      <Table bordered hover>
        <thead>
          <tr>
            <th rowSpan="2">
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  checked={data.every(item =>
                    selectedPipeline
                      .map(selected => selected.id)
                      .includes(item.id)
                  )}
                  onClick={onAllSelectedPipeline}
                />
              </Form.Group>
            </th>
            <th rowSpan="2" width="10%">
              Order No.
            </th>
            <th rowSpan="2" width="25%">
              Address
            </th>
            <th rowSpan="2" width="15%">
              Company
            </th>
            <th colSpan="10" className="text-center" width="50%">
              Orders
            </th>
          </tr>
          <tr>
            <th>Assignment</th>
            <th>Status</th>
            {me.permissionList.includes('SHOW_PIPELINE_FEE') && <th>Fee</th>}
            {me.permissionList.includes('SHOW_PIPELINE_PROCESS') && (
              <th>Process</th>
            )}
            {me.permissionList.includes('SHOW_PIPELINE_QC') && <th>QC</th>}
            {me.permissionList.includes('SHOW_PIPELINE_NOTES') && (
              <th>Notes</th>
            )}
            {me.permissionList.includes('SHOW_PIPELINE_DOCS') && <th>Docs</th>}
            {me.permissionList.includes('SHOW_PIPELINE_PHOTOS') && (
              <th>Photos</th>
            )}
            {me.permissionList.includes('SHOW_PIPELINE_IFORM') && (
              <th>iForm</th>
            )}
          </tr>
        </thead>
        <StyledTbody>{loading ? renderLoading : renderRow}</StyledTbody>
      </Table>
      <PipelineContextMenu />
    </StyledDiv>
  );
};

PipelinesTable.propTypes = {
  loading: bool,
  data: arrayOf(shape({})),
  onEdit: func,
  pipelineFilter: shape({}),
  onAllSelectedPipeline: func,
  onSelectPipeline: func,
  selectedPipeline: arrayOf(shape({})),
};

PipelinesTable.defaultProps = {
  loading: false,
  data: [],
  onEdit: e => e,
  pipelineFilter: {},
  onAllSelectedPipeline: e => e,
  onSelectPipeline: e => e,
  selectedPipeline: [],
};

export default PipelinesTable;
