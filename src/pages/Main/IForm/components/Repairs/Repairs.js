import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import setCurrency from 'utils/setCurrency';
import IFormHistory from 'components/IFormHistory';
import IFormGeneral from 'components/IFormGeneral';
import isEmpty from 'lodash/isEmpty';
import removeNull from 'utils/removeNull';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import { Button, Form, Col, Card } from 'react-bootstrap';
import PIPELINE_REPAIR from 'queries/pipelineRepair';
import UPDATE_PIPELINE_REPAIR from 'mutations/updatePipelineRepair';
import CogoToastWarn from 'components/CogoToastWarn';

const initValue = [...Array(12).keys()].map(() => ({
  description: '',
  price: 0,
}));

const Repairs = ({ pipelineId, iform }) => {
  const [isLoading, setLoading] = useState(false);
  const [exterior, setExterior] = useState(initValue);
  const [interior, setInterior] = useState(initValue);
  const [updatePipelineRepair] = useMutation(UPDATE_PIPELINE_REPAIR);
  const { loading, error, data = {} } = useQuery(PIPELINE_REPAIR, {
    variables: { pipelineId },
  });
  useEffect(() => {
    const { pipelineRepair = {} } = data;
    if (!isEmpty(pipelineRepair)) {
      const newExterior = exterior.map((_, key) => ({
        description:
          pipelineRepair[`exteriorRepairDescription${key + 1}`] || '',
        price: pipelineRepair[`exteriorRepairPrice${key + 1}`] || 0,
      }));
      setExterior(newExterior);
      const newInterior = interior.map((_, key) => ({
        description:
          pipelineRepair[`interiorRepairDescription${key + 1}`] || '',
        price: pipelineRepair[`interiorRepairPrice${key + 1}`] || 0,
      }));
      setInterior(newInterior);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (error && setErrorMessage(error) !== 'mongo: no documents in result')
    return <div>{setErrorMessage(error)}</div>;
  if (loading) return <div>loading...</div>;

  const handleExteriorPrice = (k, e) => {
    const { value } = e.target;
    const newExterior = exterior.map((item, key) => {
      if (key === k)
        return {
          ...item,
          price: value,
        };
      return item;
    });
    setExterior(newExterior);
  };

  const handleExteriorDescription = (k, e) => {
    const { value } = e.target;
    const newExterior = exterior.map((item, key) => {
      if (key === k)
        return {
          ...item,
          description: value,
        };
      return item;
    });
    setExterior(newExterior);
  };
  const handleInteriorPrice = (k, e) => {
    const { value } = e.target;
    const newInterior = interior.map((item, key) => {
      if (key === k)
        return {
          ...item,
          price: value,
        };
      return item;
    });
    setInterior(newInterior);
  };

  const handleInteriorDescription = (k, e) => {
    const { value } = e.target;
    const newInterior = interior.map((item, key) => {
      if (key === k)
        return {
          ...item,
          description: value,
        };
      return item;
    });
    setInterior(newInterior);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const newExterior = {};
    exterior.map((item, key) => {
      if (item.description && item.price) {
        newExterior[`exteriorRepairDescription${key + 1}`] = item.description;
        newExterior[`exteriorRepairPrice${key + 1}`] = parseFloat(item.price);
      }
      return false;
    });

    const newInterior = {};
    interior.map((item, key) => {
      if (item.description && item.price) {
        newInterior[`interiorRepairDescription${key + 1}`] = item.description;
        newInterior[`interiorRepairPrice${key + 1}`] = parseFloat(item.price);
      }
      return false;
    });

    const input = removeNull({
      ...newExterior,
      ...newInterior,
    });

    try {
      await updatePipelineRepair({
        variables: {
          pipelineId,
          input,
        },
      });
      cogoToast.success('Complete');
      setLoading(false);
    } catch (e) {
      setLoading(false);
      const isWarn =
        setErrorMessage(e).toLowerCase() === 'no record was update';

      if (isWarn) {
        CogoToastWarn(setErrorMessage(e));
        return true;
      }

      cogoToast.error(setErrorMessage(e));
    }
    return null;
  };

  return (
    <div className="border-top-0 border p-3 bg-white">
      <div className="d-flex mb-4">
        <Button
          className="mr-2"
          onClick={handleSubmit}
          disabled={isLoading}
          variant="warning"
        >
          Save
        </Button>
        <Button className="mr-auto">Estimate</Button>
        <div className="mr-2">
          <IFormHistory history={iform.history} />
        </div>
        <IFormGeneral pipelineId={pipelineId} iform={iform} />
      </div>
      <Form>
        <Form.Row>
          <Col sm="6">
            <Card>
              <Card.Header>Exterior</Card.Header>
              <Card.Body>
                <Form.Row>
                  <Col sm={2}>Item #</Col>
                  <Col sm={8}>Description</Col>
                  <Col sm={2}>Price</Col>
                </Form.Row>
                {exterior.map((item, k) => (
                  <Form.Row key={k} className="mb-1">
                    <Col sm={2}>{k + 1}</Col>
                    <Col sm={8}>
                      <Form.Control
                        onChange={e => handleExteriorDescription(k, e)}
                        value={item.description}
                      />
                    </Col>
                    <Col sm={2}>
                      <Form.Control
                        onChange={e => handleExteriorPrice(k, e)}
                        value={item.price || ''}
                      />
                    </Col>
                  </Form.Row>
                ))}
                <Form.Row>
                  <Col sm={{ offset: 8, span: 2 }} className="text-right">
                    Price
                  </Col>
                  <Col sm={2}>
                    {setCurrency(
                      'USD',
                      exterior
                        .map(item => (item.price ? parseFloat(item.price) : 0))
                        .reduce((a, b) => a + b),
                      2
                    )}
                  </Col>
                </Form.Row>
              </Card.Body>
            </Card>
          </Col>
          <Col sm="6">
            <Card>
              <Card.Header>Interior</Card.Header>
              <Card.Body>
                <Form.Row>
                  <Col sm={2}>Item #</Col>
                  <Col sm={8}>Description</Col>
                  <Col sm={2}>Price</Col>
                </Form.Row>
                {interior.map((item, k) => (
                  <Form.Row key={k} className="mb-1">
                    <Col sm={2}>{k + 1}</Col>
                    <Col sm={8}>
                      <Form.Control
                        onChange={e => handleInteriorDescription(k, e)}
                        value={item.description}
                      />
                    </Col>
                    <Col sm={2}>
                      <Form.Control
                        onChange={e => handleInteriorPrice(k, e)}
                        value={item.price || ''}
                      />
                    </Col>
                  </Form.Row>
                ))}
                <Form.Row>
                  <Col sm={{ offset: 8, span: 2 }} className="text-right">
                    Price
                  </Col>
                  <Col sm={2}>
                    {setCurrency(
                      'USD',
                      interior
                        .map(item => (item.price ? parseFloat(item.price) : 0))
                        .reduce((a, b) => a + b),
                      2
                    )}
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

Repairs.propTypes = {
  pipelineId: PropTypes.string,
  iform: PropTypes.shape({
    history: {},
  }),
};

Repairs.defaultProps = {
  pipelineId: null,
  iform: {},
};

export default Repairs;
