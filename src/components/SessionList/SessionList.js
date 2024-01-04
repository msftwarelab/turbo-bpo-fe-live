import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import setErrorMessage from 'utils/setErrorMessage';
import moment from 'moment';
import { Table } from 'react-bootstrap';
import { func, shape } from 'prop-types';
import { useMe } from 'contexts/Me';
import Pagination from 'components/Pagination';
import ALL_SESSION from 'queries/allSession';
import EditSession from 'components/EditSession';

const SessionList = ({
  filter = {},
  onChangeFilter = e => e,
  onLoaded,
  onStarted,
}) => {
  const { loading, error, data = {} } = useQuery(ALL_SESSION, {
    variables: { filter },
  });
  const { me } = useMe();

  useEffect(() => {
    if (data.allSession) {
      onLoaded();
      const { results = [] } = data.allSession;
      let hasStarted = false;
      results.forEach(item => {
        if (item.start && !item.end && !hasStarted) hasStarted = true;
      });
      if (hasStarted) onStarted();
    }
  }, [data, onLoaded, onStarted]);
  if (error) return <div>{setErrorMessage(error)}</div>;
  const { allSession = {} } = data;
  const { totalCount = 0, results = [] } = allSession;
  const pageCount = Math.ceil(totalCount / filter.limit);
  const renderLoading = (
    <tr>
      <td colSpan={6} className="text-center">
        loading...
      </td>
    </tr>
  );
  const renderRow = results.length ? (
    results.map(item => (
      <tr key={item.id}>
        <td>
          {item.invoiceDate
            ? moment(item.invoiceDate).format('MMM DD YYYY')
            : '-'}
        </td>
        <td>
          {item.start ? moment(item.start).format('MMM DD YYYY, hh:mmA') : '-'}
        </td>
        <td>
          {item.end ? moment(item.end).format('MMM DD YYYY, hh:mmA') : '-'}
        </td>
        {me.permissionList.includes('EDIT_SESSION') && (
          <td>
            <EditSession session={item} filter={filter} />
          </td>
        )}
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={6} className="text-center">
        No data yet...
      </td>
    </tr>
  );

  return (
    <>
      <Table bordered striped hover size="sm">
        <thead>
          <tr>
            <th>Invoice Date (PH)</th>
            <th>Start</th>
            <th colSpan="2">End</th>
          </tr>
        </thead>
        <tbody>{loading ? renderLoading : renderRow}</tbody>
      </Table>
      {results && results.length ? (
        <Pagination
          pageCount={pageCount}
          onPageChange={onChangeFilter}
          currentPage={filter.offset / filter.limit}
        />
      ) : null}
    </>
  );
};

SessionList.defaultProps = {
  filter: {},
  onChangeFilter: e => e,
  onLoaded: e => e,
  onStarted: e => e,
};

SessionList.propTypes = {
  filter: shape({}),
  onLoaded: func,
  onChangeFilter: func,
  onStarted: func,
};

export default SessionList;
