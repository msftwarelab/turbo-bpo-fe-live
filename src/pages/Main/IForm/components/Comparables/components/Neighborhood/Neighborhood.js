import React, { useState } from 'react';
import { shape } from 'prop-types';
import marketTrendOptions from 'constants/marketTrendOptions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Col, Card, Button, Form, Row } from 'react-bootstrap';
import { StyledCol } from './styles';

const Neighborhood = ({ inputRef, iform }) => {
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);
  return (
    <StyledCol isShow={isShow} sm="6">
      <Card>
        <Card.Header className="p-0">
          <Button variant="link" onClick={handleShow}>
            <FontAwesomeIcon icon={faChevronRight} className="mr-3" />
            Neighborhood
          </Button>
        </Card.Header>
        <Card.Body className="pl-5">
          <Form.Row>
            <Col sm="4">
              <Form.Group as={Row}>
                <Form.Label column sm="5">
                  REO Driven
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    as="select"
                    // defaultValue={iform.cmbREODriven || ''} /* No field yet in BE */
                    // ref={el => (inputRef.current.cmbREODriven = el)}
                  >
                    <option value="YES">Yes</option>
                    <option value="NO">No</option>
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="5">
                  Market Trend
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    as="select"
                    defaultValue={iform.cmbNeighborhoodTrend || ''}
                  >
                    {marketTrendOptions.map(item => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="5">
                  Monthly Percentage
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    defaultValue={iform.txtMonthlyPecent || ''}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="5">
                  6 Month Pecentage
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    defaultValue={iform.txt6MonthPecent || ''}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="5">
                  Annual Percentage
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    defaultValue={iform.txtAnnualPecent || ''}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="5">
                  Total Listings
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    defaultValue={iform.txtListings || ''}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="5">
                  Supply
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    as="select"
                    defaultValue={iform.cmbSupply || ''}
                  >
                    {marketTrendOptions.map(item => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>
            </Col>
            <Col sm="4">
              <Form.Group as={Row}>
                <Form.Label column sm="5">
                  REO Trend
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    as="select"
                    defaultValue={iform.cmbREOTrend || ''}
                  >
                    {marketTrendOptions.map(item => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="5">
                  #FM
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    defaultValue={iform.txtNoOfFM || ''}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="5">
                  #SS
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    defaultValue={iform.txtNoOfSS || ''}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="5">
                  #REO
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    defaultValue={iform.txtNoOfREO || ''}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="5">
                  #Distressed
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    defaultValue={iform.txtNoOfDistressed || ''}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="5">
                  Total Sales
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    defaultValue={iform.txtSales || ''}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="5">
                  Demand
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    defaultValue={iform.cmbDemand || ''}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col sm="4">
              <div>90 Day As-Is Value</div>
              <Form.Group>
                <Form.Label>
                  <small>Trulia Neighborhood Trend Comments:</small>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  defaultValue={iform.txtZillowNeighborhoodTrend || ''}
                  rows="4"
                />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col sm="4">
              <div className="mb-2">SALES</div>
              <Form.Group as={Row}>
                <Form.Label column sm="5">
                  Min. Value
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    as="select"
                    // defaultValue={iform.txtSalesMinValue || ''} /* Note: no field yet in BE */
                    // ref={el => (inputRef.current.txtSalesMinValue = el)}
                  >
                    {marketTrendOptions.map(item => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="5">
                  Med. Value
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    defaultValue={iform.txtSalesMedValue || ''}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="5">
                  Max. Value
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                  // defaultValue={iform.txtSalesMaxValue || ''} /* Note: no field yet in BE */
                  // ref={el => (inputRef.current.txtSalesMaxValue = el)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="5">
                  DOM Ave.
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    defaultValue={iform.txtSalesDOM || ''}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="5">
                  DOM Range
                </Form.Label>
                <Col sm="7">
                  <Form.Row>
                    <Col>
                      <Form.Control
                        defaultValue={iform.txtSalesDOMRange1 || ''}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        defaultValue={iform.txtSalesDOMRange2 || ''}
                      />
                    </Col>
                  </Form.Row>
                </Col>
              </Form.Group>
            </Col>
            <Col sm="4">
              <div className="mb-2">LISTINGS</div>
              <Form.Group as={Row}>
                <Form.Label column sm="5">
                  Min. Value
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    as="select"
                    defaultValue={iform.txtListingsMinValue || ''}
                  >
                    {marketTrendOptions.map(item => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="5">
                  Med. Value
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    defaultValue={iform.txtListingsMedValue || ''}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="5">
                  Max. Value
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    defaultValue={iform.txtListingsMaxValue || ''}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="5">
                  DOM Ave.
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    defaultValue={iform.txtListingsDOM || ''}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="5">
                  DOM Range
                </Form.Label>
                <Col sm="7">
                  <Form.Row>
                    <Col>
                      <Form.Control
                        defaultValue={iform.txtListingsDOMRange1 || ''}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        defaultValue={iform.txtListingsDOMRange2 || ''}
                      />
                    </Col>
                  </Form.Row>
                </Col>
              </Form.Group>
            </Col>
            <Col sm="4">
              <div>Z-Value</div>
              <Form.Group>
                <Form.Label>
                  <small>Neighborhood Trend Comments:</small>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  defaultValue={iform.txtNeighborhoodTrendComments || ''}
                  rows="4"
                />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col sm="6">
              <div className="mb-2">RENTAL</div>
              <Form.Group as={Row}>
                <Form.Label column sm="5">
                  Owner Occupied
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    defaultValue={iform.txtOwnerOccupied || ''}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="5">
                  Renter Occupied
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    defaultValue={iform.txtRenterOccupied || ''}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="5">
                  Market Rent Monthly
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    defaultValue={iform.txtMarketRent || ''}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="5">
                  # of Rentals currently on the market
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    defaultValue={iform.txtNoOfRentals || ''}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="5">
                  Typical Days on Market
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    defaultValue={iform.txtTypicalDOM || ''}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="5">
                  Typical Rental Rates per Sq/Ft
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    defaultValue={iform.txtTypicalRentalRates || ''}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Form.Row>
        </Card.Body>
      </Card>
    </StyledCol>
  );
};

Neighborhood.propTypes = {
  inputRef: shape({}),
  iform: shape({}),
};

Neighborhood.defaultProps = {
  inputRef: {},
  iform: {},
};

export default Neighborhood;
