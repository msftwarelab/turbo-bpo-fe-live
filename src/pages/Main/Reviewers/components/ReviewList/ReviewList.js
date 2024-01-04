import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Pagination from 'components/Pagination';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import cogoToast from 'cogo-toast';
import { useMe } from 'contexts/Me';
import setErrorMessage from 'utils/setErrorMessage';
import ALL_REVIEW from 'queries/allReview';
import AddReview from '../AddReview';
import EditReview from '../EditReview';
import DeleteReview from '../DeleteReview';

const ReviewList = () => {
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
  });
  const { loading, error, data = {} } = useQuery(ALL_REVIEW, {
    variables: { filter },
  });
  if (error) cogoToast.error(setErrorMessage(error));
  const handleFilter = async e => {
    const newFilter = {
      ...filter,
      offset: e.selected * filter.limit,
    };
    setFilter(newFilter);
  };
  const { me } = useMe();
  const { allReview = {} } = data;
  const { totalCount = 0, results = [] } = allReview;
  const pageCount = Math.ceil(totalCount / filter.limit);

  return (
    <>
      {me.permissionList.includes('ADD_REVIEW') && (
        <div className="mb-3 d-flex">
          <AddReview filter={filter} />
        </div>
      )}

      <Table bordered striped hover size="sm">
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Address</th>
            <th>Assigned To</th>
            <th>Review Desc</th>
            <th>Review Date</th>
            <th>Review By</th>
            <th>Attachment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={9} className="text-center">
                loading...
              </td>
            </tr>
          ) : results.length ? (
            results.map(item => (
              <tr key={item.id}>
                <td>{item.orderNumber}</td>
                <td>{item.address}</td>
                <td>{item.assignedTo}</td>
                <td>{item.reviewDescription}</td>
                <td>
                  {moment(item.reviewDate).format('MMM DD YYYY, hh:mm A')}
                </td>
                <td>{item.reviewBy}</td>
                <td>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.fileName}
                  </a>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <EditReview review={item} filter={filter} />{' '}
                  <DeleteReview review={item} filter={filter} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="text-center">
                No data yet...
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {results && results.length ? (
        <Pagination
          pageCount={pageCount}
          onPageChange={handleFilter}
          currentPage={filter.offset / filter.limit}
        />
      ) : null}
    </>
  );
};

export default ReviewList;
