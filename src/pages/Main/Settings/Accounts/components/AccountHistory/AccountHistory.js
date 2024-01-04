import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import Pagination from 'components/Pagination';
import AccountHistoryTable from './components/AccountHistoryTable';

const AccountHistory = ({ account }) => {
  const [isShow, setShow] = useState(false);
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
  });
  const handleShow = () => setShow(!isShow);
  const pageCount = account.logs
    ? Math.ceil(account.logs.length / filter.limit)
    : 0;
  const limit = 5;
  const handleFilter = e => {
    setFilter({
      ...filter,
      offset: e.selected * limit,
    });
  };
  const data = account.logs ? account.logs.slice(filter.offset, limit) : [];
  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>
        <FontAwesomeIcon icon={faHistory} />
      </Button>
      <Modal show={isShow} onHide={handleShow} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AccountHistoryTable data={data} />
          {account.logs && account.logs.length ? (
            <Pagination
              pageCount={pageCount}
              onPageChange={handleFilter}
              currentPage={filter.offset / filter.limit}
            />
          ) : null}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AccountHistory;
