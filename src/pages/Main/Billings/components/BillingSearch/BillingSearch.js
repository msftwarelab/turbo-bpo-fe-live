import React, { useState } from 'react';
import { withApollo } from 'react-apollo';
import { shape, func } from 'prop-types';
import { Col, Form, Row } from 'react-bootstrap';
import getGroupedObject from 'utils/getGroupedObject';
import DateRangeFilter from 'components/DateRangeFilter';
import moment from 'moment';
import BillingUserSelectModal from 'components/BillingUserSelectModal';
import BillingSearchClient from 'components/BillingSearchClient';
import ALL_PIPELINE from 'queries/allPipeline';

const BillingSearch = ({ client, onGenerate }) => {
  const [searchType, setSearchType] = useState('SEARCH_DATE');
  const [isLoading, setLoading] = useState(false);
  const [dates, setDates] = useState({
    dateFrom: moment()
      .startOf('week')
      .format('YYYY-MM-DD'),
    dateTo: moment()
      .endOf('week')
      .format('YYYY-MM-DD'),
  });
  const [user, setUser] = useState(null);
  const [userOptions, setUserOptions] = useState([]);
  const handleDateFilter = async e => {
    setDates(e);
    setLoading(true);
    const { dateFrom, dateTo } = e;
    const { data } = await client.query({
      query: ALL_PIPELINE,
      variables: {
        filter: {
          offset: 0,
          limit: 10000,
          status: ['ACTIVE', 'COMPLETE', 'STANDBY', 'LATE'],
          ...e,
        },
      },
    });
    const { allPipeline = {} } = data;
    const grouped = getGroupedObject(allPipeline.results, 'authorId');
    const newUserOptions = Object.keys(grouped).map(authorId => ({
      pipelines: grouped[authorId]
        .filter(item => !item.isBilled)
        .map(item => ({
          isSelected: true,
          ...item,
        })),
      username: grouped[authorId][0].authorName,
      id: grouped[authorId][0].authorId,
    }));
    setUserOptions(newUserOptions);
    setLoading(false);
    if (!dateFrom || !dateTo || !user) return false;

    onGenerate({
      ...dates,
      entries: allPipeline.results,
    });
    return false;
  };

  const handleUserChange = newUserOption => {
    setUser(newUserOption.username);
    onGenerate({
      ...dates,
      userId: newUserOption.id,
      entries: newUserOption.pipelines.filter(item => item.isSelected),
    });
  };

  const handleSearchTypeChange = e => {
    const { value } = e.target;
    setSearchType(value);
  };

  return (
    <div className="pt-3 pr-3 pl-3">
      <Row>
        <Col sm="6">
          <Form.Group as={Row}>
            <Form.Label column sm="5">
              Choose Search Type
            </Form.Label>
            <Col sm="7">
              <Form.Control
                name="searchType"
                as="select"
                value={searchType}
                onChange={handleSearchTypeChange}
              >
                <option value="SEARCH_CLIENT">Search by client</option>
                <option value="SEARCH_DATE">Search by date</option>
              </Form.Control>
            </Col>
          </Form.Group>
        </Col>
      </Row>
      {searchType === 'SEARCH_DATE' && (
        <div className="border">
          <Form.Row className="p-3">
            <Col sm="6">
              <DateRangeFilter
                filter={dates}
                disabled={isLoading}
                onChange={handleDateFilter}
              />
            </Col>
            <Col sm="6">
              {isLoading ? (
                <div className="mt-2">loading clients...</div>
              ) : (
                <Form.Group as={Form.Row} className="mb-0">
                  <Form.Label column sm="2">
                    Client:
                  </Form.Label>
                  <Col sm="9" className="d-flex">
                    <span className={`mr-2 mt-2 ${!user ? 'text-danger' : ''}`}>
                      {user || 'No client selected.'}
                    </span>
                    <BillingUserSelectModal
                      options={userOptions}
                      onSelect={handleUserChange}
                      isLoading={isLoading}
                    />
                  </Col>
                </Form.Group>
              )}
            </Col>
          </Form.Row>
        </div>
      )}
      {searchType === 'SEARCH_CLIENT' && (
        <div className="border">
          <Form.Row className="p-3">
            <Col sm="12">
              <BillingSearchClient onSelect={onGenerate} />
            </Col>
          </Form.Row>
        </div>
      )}
    </div>
  );
};

BillingSearch.propTypes = {
  client: shape({}),
  onGenerate: func,
};

BillingSearch.defaultProps = {
  client: {},
  onGenerate: e => e,
};
export default withApollo(BillingSearch);
