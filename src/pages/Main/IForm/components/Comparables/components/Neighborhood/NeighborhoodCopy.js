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
                    ref={el => (inputRef.current.cmbNeighborhoodTrend = el)}
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
                    ref={el => (inputRef.current.txtMonthlyPecent = el)}
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
                    ref={el => (inputRef.current.txt6MonthPecent = el)}
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
                    ref={el => (inputRef.current.txtAnnualPecent = el)}
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
                    ref={el => (inputRef.current.txtListings = el)}
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
                    ref={el => (inputRef.current.cmbSupply = el)}
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
                    ref={el => (inputRef.current.cmbREOTrend = el)}
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
                    ref={el => (inputRef.current.txtNoOfFM = el)}
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
                    ref={el => (inputRef.current.txtNoOfSS = el)}
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
                    ref={el => (inputRef.current.txtNoOfREO = el)}
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
                    ref={el => (inputRef.current.txtNoOfDistressed = el)}
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
                    ref={el => (inputRef.current.txtSales = el)}
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
                    ref={el => (inputRef.current.cmbDemand = el)}
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
                  ref={el => (inputRef.current.txtZillowNeighborhoodTrend = el)}
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
                    ref={el => (inputRef.current.txtSalesMedValue = el)}
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
                    ref={el => (inputRef.current.txtSalesDOM = el)}
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
                        ref={el => (inputRef.current.txtSalesDOMRange1 = el)}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        defaultValue={iform.txtSalesDOMRange2 || ''}
                        ref={el => (inputRef.current.txtSalesDOMRange2 = el)}
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
                    ref={el => (inputRef.current.txtListingsMinValue = el)}
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
                    ref={el => (inputRef.current.txtListingsMedValue = el)}
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
                    ref={el => (inputRef.current.txtListingsMaxValue = el)}
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
                    ref={el => (inputRef.current.txtListingsDOM = el)}
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
                        ref={el => (inputRef.current.txtListingsDOMRange1 = el)}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        defaultValue={iform.txtListingsDOMRange2 || ''}
                        ref={el => (inputRef.current.txtListingsDOMRange2 = el)}
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
                  ref={el =>
                    (inputRef.current.txtNeighborhoodTrendComments = el)
                  }
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
                    ref={el => (inputRef.current.txtOwnerOccupied = el)}
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
                    ref={el => (inputRef.current.txtRenterOccupied = el)}
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
                    ref={el => (inputRef.current.txtMarketRent = el)}
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
                    ref={el => (inputRef.current.txtNoOfRentals = el)}
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
                    ref={el => (inputRef.current.txtTypicalDOM = el)}
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
                    ref={el => (inputRef.current.txtTypicalRentalRates = el)}
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
