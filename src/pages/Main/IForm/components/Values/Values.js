import React, { useState } from 'react';
import { string, shape } from 'prop-types';
import { useMutation, useQuery } from '@apollo/react-hooks';
import IFormHistory from 'components/IFormHistory';
import IFormGeneral from 'components/IFormGeneral';
import setErrorMessage from 'utils/setErrorMessage';
import cogoToast from 'cogo-toast';
import removeNull from 'utils/removeNull';
import PIPELINE_REPAIR from 'queries/pipelineRepair';
import ALL_COMMENT from 'queries/allComment';
import removeTypeName from 'utils/removeTypeName';
import { useMe } from 'contexts/Me';
import { Button, Form, Row, Col, Card } from 'react-bootstrap';
import IFORM from 'queries/iform';
import UPDATE_IFORM from 'mutations/updateIform';

const Values = ({ pipelineId, iform }) => {
  const { me } = useMe();
  const isClient = me.roles.includes('CLIENT');
  const [input, setInput] = useState(iform);
  const [isLoading, setLoading] = useState(false);
  const [updateIform] = useMutation(UPDATE_IFORM);
  const { loading, error, data = {} } = useQuery(PIPELINE_REPAIR, {
    variables: { pipelineId },
  });

  const {
    loading: commentLoading,
    error: commentError,
    data: commentData = {},
  } = useQuery(ALL_COMMENT, {
    variables: { userId: me.id },
  });

  if (error || commentError) cogoToast.error(setErrorMessage(error));
  if (loading || commentLoading) return 'loading...';

  const getTotalRepair = pipelineRepair => {
    let total = 0;
    if (pipelineRepair) {
      [...Array(10).keys()].forEach(item => {
        total += parseFloat(
          pipelineRepair[`exteriorRepairPrice${item + 1}`] || 0,
          10
        );
        total += parseFloat(
          pipelineRepair[`interiorRepairPrice${item + 1}`] || 0,
          10
        );
      });
    }
    return total;
  };

  const findCommentSection = section => {
    return commentData.allComment.filter(
      comment => comment.section === section
    );
  };

  const showRandomSectionValue = section => {
    const comments = commentData.allComment.filter(
      comment => comment.section === section
    );
    const random = Math.floor(Math.random() * comments.length);
    return comments[random] ? comments[random].value : '';
  };

  const handleChange = e => {
    const { name, value } = e.target;
    let repairedName = `${name}Repaired`;
    if (name === 'txtListPriceFinalValues')
      repairedName = 'txtListPriceRepaired';
    else if (name === 'txt30DayListPriceFinalValues')
      repairedName = 'txt30DayListPriceRepaired';
    setInput({
      ...input,
      [name]: value,
      [repairedName]:
        parseFloat(value, 10) + getTotalRepair(data.pipelineRepair),
    });
  };

  const handleCheck = e => {
    const { name, checked } = e.target;
    if (checked) {
      setInput({
        ...input,
        [name]: 'YES',
      });
    } else {
      setInput({
        ...input,
        [name]: 'NO',
      });
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    const newInput = input;
    delete newInput.history;
    delete newInput.id;
    delete newInput.pipelineId;
    try {
      await updateIform({
        variables: {
          pipelineId,
          input: removeNull(removeTypeName(newInput)),
        },
        refetchQueries: [{ query: IFORM, variables: { pipelineId } }],
      });
      setLoading(false);
      cogoToast.success('IForm initiated');
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };
  return (
    <div className="border-top-0 border p-3 bg-white">
      <div className="d-flex mb-4">
        <Button
          className="mr-auto"
          onClick={handleSubmit}
          variant="warning"
          disabled={isLoading}
        >
          Save
        </Button>
        <div className="mr-2">
          <IFormHistory history={iform.history} />
        </div>
        <IFormGeneral pipelineId={pipelineId} iform={iform} />
      </div>
      <Form>
        <Form.Row>
          <Col sm="5">
            <Card>
              <Card.Header>Final Values</Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    <Form.Group as={Row}>
                      <Form.Label column sm="7">
                        30 Day Quick Sale
                      </Form.Label>
                      <Col sm="5">
                        <Form.Control
                          name="txt30DayQuickSale"
                          value={input.txt30DayQuickSale || ''}
                          onChange={handleChange}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group as={Row}>
                      <Form.Label column sm="7">
                        30 Day Repaired
                      </Form.Label>
                      <Col sm="5">
                        <Form.Control
                          name="txt30DayQuickSaleRepaired"
                          value={input.txt30DayQuickSaleRepaired || ''}
                          onChange={handleChange}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group as={Row}>
                      <Form.Label column sm="7">
                        60 Day Quick Sale
                      </Form.Label>
                      <Col sm="5">
                        <Form.Control
                          name="txt60DayQuickSale"
                          value={input.txt60DayQuickSale || ''}
                          onChange={handleChange}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group as={Row}>
                      <Form.Label column sm="7">
                        60 Day Repaired
                      </Form.Label>
                      <Col sm="5">
                        <Form.Control
                          name="txt60DayQuickSaleRepaired"
                          value={input.txt60DayQuickSaleRepaired || ''}
                          onChange={handleChange}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group as={Row}>
                      <Form.Label column sm="7">
                        90 Day As-is Sale
                      </Form.Label>
                      <Col sm="5">
                        <Form.Control
                          name="txt90DayAsIsValue"
                          value={input.txt90DayAsIsValue || ''}
                          onChange={handleChange}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group as={Row}>
                      <Form.Label column sm="7">
                        90 Day Repaired
                      </Form.Label>
                      <Col sm="5">
                        <Form.Control
                          name="txt90DayAsIsValueRepaired"
                          value={input.txt90DayAsIsValueRepaired || ''}
                          onChange={handleChange}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group as={Row}>
                      <Form.Label column sm="7">
                        120 Day As-is Sale
                      </Form.Label>
                      <Col sm="5">
                        <Form.Control
                          name="txt120DayQuickSale"
                          value={input.txt120DayQuickSale || ''}
                          onChange={handleChange}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group as={Row}>
                      <Form.Label column sm="7">
                        120 Day Repaired
                      </Form.Label>
                      <Col sm="5">
                        <Form.Control
                          name="txt120DayQuickSaleRepaired"
                          value={input.txt120DayQuickSaleRepaired || ''}
                          onChange={handleChange}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group as={Row}>
                      <Form.Label column sm="7">
                        180 Day As-is Sale
                      </Form.Label>
                      <Col sm="5">
                        <Form.Control
                          name="txt180DayQuickSale"
                          value={input.txt180DayQuickSale || ''}
                          onChange={handleChange}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group as={Row}>
                      <Form.Label column sm="7">
                        180 Day Repaired
                      </Form.Label>
                      <Col sm="5">
                        <Form.Control
                          name="txt180DayQuickSaleRepaired"
                          value={input.txt180DayQuickSaleRepaired || ''}
                          onChange={handleChange}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group as={Row}>
                      <Form.Label column sm="7">
                        List Price
                      </Form.Label>
                      <Col sm="5">
                        <Form.Control
                          name="txtListPriceFinalValues"
                          value={input.txtListPriceFinalValues || ''}
                          onChange={handleChange}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group as={Row}>
                      <Form.Label column sm="7">
                        List Price Repaired
                      </Form.Label>
                      <Col sm="5">
                        <Form.Control
                          name="txtListPriceRepaired"
                          value={input.txtListPriceRepaired || ''}
                          onChange={handleChange}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group as={Row}>
                      <Form.Label column sm="7">
                        30 Day List Price
                      </Form.Label>
                      <Col sm="5">
                        <Form.Control
                          name="txt30DayListPriceFinalValues"
                          value={input.txt30DayListPriceFinalValues || ''}
                          onChange={handleChange}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group as={Row}>
                      <Form.Label column sm="7">
                        30 Day List Price Repaired
                      </Form.Label>
                      <Col sm="5">
                        <Form.Control
                          name="txt30DayListPriceRepaired"
                          value={input.txt30DayListPriceRepaired || ''}
                          onChange={handleChange}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    House
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      as="select"
                      name="cmbHouse"
                      value={input.cmbHouse}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      {findCommentSection('cmbHouse').map(item => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    Positive
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      as="select"
                      name="cmbPositive"
                      value={input.cmbPositive || ''}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      {findCommentSection('cmbPositive').map(item => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    Negative
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      as="select"
                      name="cmbNegative"
                      value={input.cmbNegative || ''}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      {findCommentSection('cmbNegative').map(item => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    View
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      as="select"
                      name="cmbView"
                      value={input.cmbView || ''}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      {findCommentSection('cmbView').map(item => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    Market
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      as="select"
                      name="cmbMarket"
                      value={input.cmbMarket || ''}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      {findCommentSection('cmbMarket').map(item => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    Pricing
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      as="select"
                      name="cmbPricing"
                      value={input.cmbPricing || ''}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      {findCommentSection('cmbPricing').map(item => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    Listing
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      as="select"
                      name="cmbListing"
                      value={input.cmbListing || ''}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      {findCommentSection('cmbListing').map(item => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    Extra
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      as="select"
                      name="cmbExtra"
                      value={input.cmbExtra || ''}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      {findCommentSection('cmbExtra').map(item => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    Unique
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      name="txtUnique"
                      value={input.txtUnique || ''}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
          <Col sm="7">
            <Card>
              <Card.Header>Marketing Strategy</Card.Header>
              <Card.Body>
                {!isClient && (
                  <>
                    <div className="mb-2">
                      <div>
                        Is this properties condition favorable or unfavorable
                        for resale?
                      </div>
                      <div>
                        <Form.Check
                          inline
                          name="rdbresaletext"
                          checked={input.rdbresaletext === 'Favorable'}
                          onChange={handleChange}
                          value="Favorable"
                          label="Favorable"
                          type="radio"
                          id="favorable"
                        />
                        <Form.Check
                          inline
                          name="rdbresaletext"
                          checked={input.rdbresaletext === 'Unfavorable'}
                          onChange={handleChange}
                          value="Unfavorable"
                          label="Unfavorable"
                          type="radio"
                          id="unfavorable"
                        />
                      </div>
                    </div>
                    <div className="mb-2">
                      <div>
                        Should the property be marketed As-Is or Repaired?
                      </div>
                      <div>
                        <Form.Check
                          inline
                          name="rdbmarketedtext"
                          checked={input.rdbmarketedtext === 'As-Is'}
                          onChange={handleChange}
                          value="As-Is"
                          label="As-Is"
                          type="radio"
                          id="as-is"
                        />
                        <Form.Check
                          inline
                          name="rdbmarketedtext"
                          checked={input.rdbmarketedtext === 'Repaired'}
                          onChange={handleChange}
                          value="Repaired"
                          label="Repaired"
                          type="radio"
                          id="repaired"
                        />
                      </div>
                    </div>
                    <div className="mb-2">
                      <div>This property is for PMI Removal?</div>
                      <div>
                        <Form.Check
                          inline
                          name="txtpmi"
                          checked={input.txtpmi === 'Yes'}
                          onChange={handleChange}
                          value="Yes"
                          label="Yes"
                          type="radio"
                          id="yes"
                        />
                        <Form.Check
                          inline
                          name="txtpmi"
                          checked={input.txtpmi === 'No'}
                          onChange={handleChange}
                          value="No"
                          label="No"
                          type="radio"
                          id="no"
                        />
                      </div>
                    </div>
                    <div className="mb-2">
                      <div>What makes the property unique?</div>
                      <div>
                        <Form.Check
                          checked={input.txtcbnew === 'YES'}
                          onChange={handleCheck}
                          name="txtcbnew"
                          inline
                          label="New"
                          type="checkbox"
                          id="New"
                        />
                        <Form.Check
                          checked={input.txtcbold === 'YES'}
                          onChange={handleCheck}
                          name="txtcbold"
                          inline
                          label="Old"
                          type="checkbox"
                          id="Old"
                        />
                        <Form.Check
                          checked={input.txtcbstyle === 'YES'}
                          onChange={handleCheck}
                          name="txtcbstyle"
                          inline
                          label="Style"
                          type="checkbox"
                          id="Style"
                        />
                        <Form.Check
                          checked={input.txtcblot === 'YES'}
                          onChange={handleCheck}
                          name="txtcblot"
                          inline
                          label="Lot"
                          type="checkbox"
                          id="Lot"
                        />
                      </div>
                      <div>
                        <Form.Check
                          checked={input.txtcbview === 'YES'}
                          onChange={handleCheck}
                          name="txtcbview"
                          inline
                          label="View"
                          type="checkbox"
                          id="View"
                        />
                        <Form.Check
                          checked={input.txtcbdamage === 'YES'}
                          onChange={handleCheck}
                          name="txtcbdamage"
                          inline
                          label="Damage"
                          type="checkbox"
                          id="Damage"
                        />
                        <Form.Check
                          checked={input.txtcbupgrade === 'YES'}
                          onChange={handleCheck}
                          name="txtcbupgrade"
                          inline
                          label="Upgrade"
                          type="checkbox"
                          id="Upgrade"
                        />
                        <Form.Check
                          checked={input.txtcbinfluence === 'YES'}
                          onChange={handleCheck}
                          name="txtcbinfluence"
                          inline
                          label="Influences"
                          type="checkbox"
                          id="Influences"
                        />
                      </div>
                    </div>
                    <Form.Control
                      className="mb-2"
                      as="textarea"
                      name="txtOtherComments"
                      value={input.txtOtherComments || ''}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Other comments"
                    />
                  </>
                )}

                <Form.Control
                  className="mb-2"
                  as="textarea"
                  name="txtSubjectComments"
                  value={
                    input.txtSubjectComments ||
                    showRandomSectionValue('txtSubjectComments')
                  }
                  onChange={handleChange}
                  rows="3"
                  placeholder="Subject comments"
                />
                <Form.Control
                  className="mb-2"
                  as="textarea"
                  name="txtNeighborhoodComments"
                  value={
                    input.txtNeighborhoodComments ||
                    showRandomSectionValue('txtNeighborhoodComments')
                  }
                  onChange={handleChange}
                  rows="3"
                  placeholder="Neighborhood comments"
                />
                <Form.Control
                  className="mb-2"
                  as="textarea"
                  name="txtNeighborhoodTrend"
                  value={
                    input.txtNeighborhoodTrend ||
                    showRandomSectionValue('txtNeighborhoodTrend')
                  }
                  onChange={handleChange}
                  rows="3"
                  placeholder="Neighborhood trends"
                />
                <Form.Control
                  className="mb-2"
                  as="textarea"
                  name="txtUniqueComments"
                  value={
                    input.txtUniqueComments ||
                    showRandomSectionValue('txtUniqueComments')
                  }
                  onChange={handleChange}
                  rows="3"
                  placeholder="Unique comments"
                />
                <Form.Control
                  className="mb-2"
                  as="textarea"
                  name="txtMarketingStrategy"
                  value={
                    input.txtMarketingStrategy ||
                    showRandomSectionValue('txtMarketingStrategy')
                  }
                  onChange={handleChange}
                  rows="3"
                  placeholder="Marketing Strategy"
                />
                <Form.Control
                  className="mb-2"
                  as="textarea"
                  name="txtDisclaimer"
                  value={
                    input.txtDisclaimer ||
                    showRandomSectionValue('txtDisclaimer')
                  }
                  onChange={handleChange}
                  rows="3"
                  placeholder="General Disclaimer"
                />
                <Form.Row>
                  <Col sm="6">
                    <Form.Control
                      className="mb-2"
                      as="textarea"
                      name="txtBrokerComments"
                      value={
                        input.txtBrokerComments ||
                        showRandomSectionValue('txtBrokerComments')
                      }
                      onChange={handleChange}
                      rows="3"
                      placeholder="Broker comments"
                    />
                  </Col>
                  <Col sm="6">
                    <Form.Control
                      className="mb-2"
                      as="textarea"
                      name="txtValidation"
                      value={
                        input.txtValidation ||
                        showRandomSectionValue('txtValidation')
                      }
                      onChange={handleChange}
                      rows="3"
                      placeholder="Variances"
                    />
                  </Col>
                </Form.Row>
              </Card.Body>
            </Card>
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
};

Values.propTypes = {
  pipelineId: string,
  iform: shape({}),
};

Values.defaultProps = {
  pipelineId: null,
  iform: {},
};

export default Values;
