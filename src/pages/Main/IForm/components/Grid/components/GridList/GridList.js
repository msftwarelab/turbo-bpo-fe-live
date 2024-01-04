import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Table, Form, Row, Col } from 'react-bootstrap';
import { string, func, shape } from 'prop-types';
import cogoToast from 'cogo-toast';
import moment from 'moment';
import setErrorMessage from 'utils/setErrorMessage';
import ALL_IFORM_GRID from 'queries/allIformGrid';
import Pagination from 'components/Pagination';
import MLSComments from 'components/MLSComments';
import DeleteGrid from '../DeleteGrid';
import DragTableRow from '../DragTableRow';
import { StyledOverflow } from './styles';

const GridList = ({
  pipelineId,
  filter,
  onChangeFilter,
  onGridDrop,
  iform,
}) => {
  const [selectedGrids, setSelectedGrids] = useState([]);
  const { loading, error, data = {}, refetch } = useQuery(ALL_IFORM_GRID, {
    variables: { pipelineId, filter },
  });
  if (error) cogoToast.error(setErrorMessage(error));
  const handleFilter = async e => {
    const newFilter = {
      ...filter,
      offset: e.selected * filter.limit,
    };
    onChangeFilter(newFilter);
  };

  const handleSearch = e => {
    const { value } = e.target;
    onChangeFilter({
      ...filter,
      search: value,
    });
    refetch();
  };
  const { allIformGrid = {} } = data;
  const { totalCount = 0, results = [] } = allIformGrid;
  const pageCount = Math.ceil(totalCount / filter.limit);

  const handleSelectedGrid = e => {
    let newSelectedGrids = [...selectedGrids, e];
    if (selectedGrids.map(item => item.id).includes(e.id)) {
      newSelectedGrids = selectedGrids.filter(item => item.id !== e.id);
    }
    setSelectedGrids(newSelectedGrids);
  };

  const handleAllSelectedGrids = () => {
    let newSelectedGrids = results;
    if (
      results.some(item =>
        selectedGrids.map(selected => selected.id).includes(item.id)
      )
    ) {
      newSelectedGrids = [];
    }
    setSelectedGrids(newSelectedGrids);
  };

  const renderLoading = (
    <tr>
      <td colSpan={30} className="text-center">
        loading...
      </td>
    </tr>
  );

  const renderRow = results.length ? (
    results.map(item => (
      <DragTableRow iformGrid={item} key={item.id} onDrop={onGridDrop}>
        <td>
          <Form.Group>
            <Form.Check
              type="checkbox"
              checked={selectedGrids.map(select => select.id).includes(item.id)}
              onChange={() => handleSelectedGrid(item)}
            />
          </Form.Group>
        </td>
        <td>{item.mlsNumber}</td>
        <td>{item.status}</td>
        <td>{item.address}</td>
        <td>{item.unitNumber}</td>
        <td>{item.city}</td>
        <td>{item.zip}</td>
        <td>
          {item.originalListDate
            ? moment(item.originalListDate).format('MM/DD/YYYY')
            : ''}
        </td>
        <td>
          {item.listDate ? moment(item.listDate).format('MM/DD/YYYY') : ''}
        </td>
        <td>
          {item.saleDate ? moment(item.saleDate).format('MM/DD/YYYY') : ''}
        </td>
        <td>{item.daysOnMarket}</td>
        <td>{item.originalListPrice}</td>
        <td>{item.listPrice}</td>
        <td>{item.salePrice}</td>
        <td>{item.yearBuilt}</td>
        <td>{item.bedrooms}</td>
        <td>{item.bathrooms}</td>
        <td>{item.halfBaths}</td>
        <td>{item.squareFootage}</td>
        <td>{item.garage}</td>
        <td>{item.lotSize}</td>
        <td>{item.subdivision}</td>
        <td>{item.pool}</td>
        <td>
          <MLSComments comments={item.mlsComments} />
        </td>
        <td>{item.firePlace}</td>
        <td>{item.closedPrice}</td>
        <td>{item.parkingSpacesGarage}</td>
        <td>{item.parkingSpacesCarport}</td>
      </DragTableRow>
    ))
  ) : (
    <tr>
      <td colSpan={30} className="text-center">
        No data yet...
      </td>
    </tr>
  );

  return (
    <>
      <StyledOverflow>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <Form.Check
                  type="checkbox"
                  checked={results.every(item =>
                    selectedGrids.map(selected => selected.id).includes(item.id)
                  )}
                  onClick={handleAllSelectedGrids}
                />
              </th>
              <th>MLS</th>
              <th>Status</th>
              <th>Address</th>
              <th>Unit Number</th>
              <th>City</th>
              <th>Zip</th>
              <th>Original List Date</th>
              <th>List Date</th>
              <th>Sale Date</th>
              <th>Days on Market</th>
              <th>Original List Price</th>
              <th>List Price</th>
              <th>Sale Price</th>
              <th>Year Built</th>
              <th>Bedrooms</th>
              <th>Bathrooms</th>
              <th>Half Baths</th>
              <th>Square Footage</th>
              <th>Garage Description</th>
              <th>Lot Size</th>
              <th>Subdivision</th>
              <th>Has Pool</th>
              <th>MLS Comments</th>
              <th>Fireplace</th>
              <th>Price Closed</th>
              <th>Parking Spaces Garage</th>
              <th>Parking Spaces Carport</th>
            </tr>
          </thead>
          <tbody>{loading ? renderLoading : renderRow}</tbody>
        </Table>
      </StyledOverflow>
      <Row>
        <Col sm="4">
          <div className="d-flex">
            <div className="mr-2">
              <DeleteGrid
                selectedGrids={selectedGrids}
                pipelineId={pipelineId}
                filter={filter}
              />
            </div>
            <Form.Control
              name="search"
              placeholder="Search MLS or Address"
              onChange={handleSearch}
              value={filter.search || ''}
            />
          </div>
        </Col>
        <Col>
          <div className="mt-2 text-center">{iform.txtSubjectAddress}</div>
        </Col>
        <Col>
          {results && results.length ? (
            <Pagination
              className="mb-0"
              viewType="ROW"
              limit={filter.limit}
              totalCount={totalCount}
              pageCount={pageCount}
              onPageChange={handleFilter}
              currentPage={filter.offset / filter.limit}
            />
          ) : null}
        </Col>
      </Row>
    </>
  );
};

GridList.propTypes = {
  iform: shape({}),
  pipelineId: string,
  onGridDrop: func,
  filter: shape({}),
  onChangeFilter: func,
};

GridList.defaultProps = {
  iform: {},
  pipelineId: null,
  onGridDrop: e => e,
  filter: {},
  onChangeFilter: e => e,
};
export default GridList;
