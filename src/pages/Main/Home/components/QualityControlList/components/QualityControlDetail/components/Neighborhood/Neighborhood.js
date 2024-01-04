import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import { Row, Col, Button, Form } from 'react-bootstrap';
import removeTypeName from 'utils/removeTypeName';
import removeNull from 'utils/removeNull';
import { shape } from 'prop-types';
import { PIPELINE_NEIGHBORHOOD } from './queries';
import { UPDATE_NEIGHBORHOOD } from './mutations';

const Neighborhood = ({ pipeline }) => {
  const [input, setInput] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [assignQualityControl] = useMutation(UPDATE_NEIGHBORHOOD);
  const { loading, error, data = {} } = useQuery(PIPELINE_NEIGHBORHOOD, {
    variables: {
      pipelineId: pipeline.id,
    },
  });

  useEffect(() => {
    setInput({
      ...input,
      ...data.pipelineNeighborhood,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (loading) return <div>loading...</div>;
  if (error) cogoToast.error(setErrorMessage(error));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await assignQualityControl({
        variables: {
          pipelineId: pipeline.id,
          input: removeTypeName(removeNull(input)),
        },
        refetchQueries: [
          {
            query: PIPELINE_NEIGHBORHOOD,
            variables: {
              pipelineId: pipeline.id,
            },
          },
        ],
      });
      setLoading(false);
      cogoToast.success('Neighborhood successfully updated');
    } catch (err) {
      setLoading(false);
      cogoToast.error(setErrorMessage(err));
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  return (
    <div className="p-2">
      <Form onSubmit={handleSubmit}>
        <div className="mb-3">
          <Button type="submit" disabled={isLoading}>
            Save
          </Button>
        </div>

        <Row>
          <Col sm="8">
            <Row>
              <Col sm="8">
                REO Driven:{' '}
                <Form.Check
                  inline
                  label="Yes"
                  type="radio"
                  checked={input.isReoDriven}
                  onChange={() =>
                    setInput({
                      ...input,
                      isReoDriven: true,
                    })
                  }
                />{' '}
                <Form.Check
                  inline
                  label="No"
                  type="radio"
                  checked={!input.isReoDriven}
                  onChange={() =>
                    setInput({
                      ...input,
                      isReoDriven: false,
                    })
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col sm="6">
                <div className="mb-2">
                  Market trend:{' '}
                  <Form.Control
                    as="select"
                    name="marketTrend"
                    value={input.marketTrend || ''}
                    style={{ width: 100, display: 'inline-block' }}
                    onChange={handleChange}
                  >
                    <option>Increasing</option>
                    <option>Stable</option>
                    <option>Decreasing</option>
                  </Form.Control>
                </div>
                <div className="mb-2">
                  Monthly percentage:{' '}
                  <Form.Control
                    type="number"
                    name="monthlyPercentage"
                    value={input.monthlyPercentage || ''}
                    style={{ width: 100, display: 'inline-block' }}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-2">
                  6 Month percentage:{' '}
                  <Form.Control
                    type="number"
                    name="sixmonthPercentage"
                    value={input.sixmonthPercentage || ''}
                    style={{ width: 100, display: 'inline-block' }}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-2">
                  Annual percentage:{' '}
                  <Form.Control
                    type="number"
                    name="annualPercentage"
                    value={input.annualPercentage || ''}
                    style={{ width: 100, display: 'inline-block' }}
                    onChange={handleChange}
                  />
                </div>
              </Col>
              <Col sm="6">
                <div className="mb-2">
                  #FM:{' '}
                  <Form.Control
                    type="number"
                    name="fm"
                    value={input.fm || ''}
                    style={{ width: 100, display: 'inline-block' }}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-2">
                  #SS:{' '}
                  <Form.Control
                    type="number"
                    name="ss"
                    value={input.ss || ''}
                    style={{ width: 100, display: 'inline-block' }}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-2">
                  #REO:{' '}
                  <Form.Control
                    type="number"
                    name="reo"
                    value={input.reo || ''}
                    style={{ width: 100, display: 'inline-block' }}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-2">
                  #Distressed:{' '}
                  <Form.Control
                    type="number"
                    name="distressed"
                    value={input.distressed || ''}
                    style={{ width: 100, display: 'inline-block' }}
                    onChange={handleChange}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm="6">
                <div className="mb-2">
                  Total listings:{' '}
                  <Form.Control
                    type="number"
                    name="totalListings"
                    value={input.totalListings || ''}
                    style={{ width: 100, display: 'inline-block' }}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-2">
                  Supply:{' '}
                  <Form.Control
                    as="select"
                    name="supply"
                    value={input.supply || ''}
                    style={{ width: 100, display: 'inline-block' }}
                    onChange={handleChange}
                  >
                    <option>Increasing</option>
                    <option>Stable</option>
                    <option>Decreasing</option>
                  </Form.Control>
                </div>
              </Col>
              <Col sm="6">
                <div className="mb-2">
                  Total sales:{' '}
                  <Form.Control
                    type="number"
                    name="totalSales"
                    value={input.totalSales || ''}
                    style={{ width: 100, display: 'inline-block' }}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-2">
                  Demand:{' '}
                  <Form.Control
                    as="select"
                    name="demand"
                    value={input.demand || ''}
                    style={{ width: 100, display: 'inline-block' }}
                    onChange={handleChange}
                  >
                    <option>Increasing</option>
                    <option>Stable</option>
                    <option>Decreasing</option>
                  </Form.Control>
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm="6">
                <h5>LISTINGS</h5>
                <div className="mb-2">
                  Min. Value:{' '}
                  <Form.Control
                    type="number"
                    name="listingsMinValue"
                    value={input.listingsMinValue || ''}
                    style={{ width: 100, display: 'inline-block' }}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-2">
                  Med. Value:{' '}
                  <Form.Control
                    type="number"
                    name="listingsMedValue"
                    value={input.listingsMedValue || ''}
                    style={{ width: 100, display: 'inline-block' }}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-2">
                  Max. Value:{' '}
                  <Form.Control
                    type="number"
                    name="listingsMaxValue"
                    value={input.listingsMaxValue || ''}
                    style={{ width: 100, display: 'inline-block' }}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-2">
                  DOM Ave.:{' '}
                  <Form.Control
                    type="number"
                    name="listingsDomAve"
                    value={input.listingsDomAve || ''}
                    style={{ width: 100, display: 'inline-block' }}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-2">
                  DOM Range:{' '}
                  <Form.Control
                    type="number"
                    name="listingsDomRangeFrom"
                    value={input.listingsDomRangeFrom || ''}
                    style={{ width: 50, display: 'inline-block' }}
                    onChange={handleChange}
                  />
                  <Form.Control
                    type="number"
                    name="listingsDomRangeTo"
                    value={input.listingsDomRangeTo || ''}
                    style={{ width: 50, display: 'inline-block' }}
                    onChange={handleChange}
                  />
                </div>
              </Col>
              <Col sm="6">
                <h5>SALES</h5>
                <div className="mb-2">
                  Min. Value:{' '}
                  <Form.Control
                    type="number"
                    name="salesMinValue"
                    value={input.salesMinValue || ''}
                    style={{ width: 100, display: 'inline-block' }}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-2">
                  Med. Value:{' '}
                  <Form.Control
                    type="number"
                    name="salesMedValue"
                    value={input.salesMedValue || ''}
                    style={{ width: 100, display: 'inline-block' }}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-2">
                  Max. Value:{' '}
                  <Form.Control
                    type="number"
                    name="salesMaxValue"
                    value={input.salesMaxValue || ''}
                    style={{ width: 100, display: 'inline-block' }}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-2">
                  DOM Ave.:{' '}
                  <Form.Control
                    type="number"
                    name="salesDomAve"
                    value={input.salesDomAve || ''}
                    style={{ width: 100, display: 'inline-block' }}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-2">
                  DOM Range:{' '}
                  <Form.Control
                    type="number"
                    name="salesDomRangeFrom"
                    value={input.salesDomRangeFrom || ''}
                    style={{ width: 50, display: 'inline-block' }}
                    onChange={handleChange}
                  />
                  <Form.Control
                    type="number"
                    name="salesDomRangeTo"
                    value={input.salesDomRangeTo || ''}
                    style={{ width: 50, display: 'inline-block' }}
                    onChange={handleChange}
                  />
                </div>
              </Col>
            </Row>
          </Col>
          <Col>
            <h5>90 Day As-Is Value</h5>
            <div className="mb-2">
              Zillow Neighborhood Trend Comments:{' '}
              <Form.Control
                as="textarea"
                rows={4}
                name="zntComments"
                value={input.zntComments || ''}
                onChange={handleChange}
              />
            </div>

            <h5>Z-Value</h5>
            <div className="mb-2">
              Neighborhood Trend Comments:{' '}
              <Form.Control
                as="textarea"
                rows={4}
                name="ntComments"
                value={input.ntComments || ''}
                onChange={handleChange}
              />
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

Neighborhood.defaultProps = {
  pipeline: {},
};

Neighborhood.propTypes = {
  pipeline: shape({}),
};

export default Neighborhood;
