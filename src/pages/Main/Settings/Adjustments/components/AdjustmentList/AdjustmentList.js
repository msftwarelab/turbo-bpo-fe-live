import React, { useState } from 'react';
import groupBy from 'lodash/groupBy';
import keys from 'lodash/keys';
import { Card, Row, Col, Button, Form } from 'react-bootstrap';
import { shape, arrayOf, func, bool } from 'prop-types';
import SetDefault from '../SetDefault';

const AdjustmentList = ({ data: currentData, onSave, isLoading }) => {
  const [data, setData] = useState(currentData);
  const groupedData = groupBy(data, 'category');
  const categories = keys(groupedData);

  const handleChange = e => {
    const { name, value } = e.target;
    const newData = [...data];
    const index = data.findIndex(item => item.id === name);
    newData[index] = {
      ...newData[index],
      value,
    };

    if (newData[index].order === 1) {
      const adjustedData = [];
      newData.forEach(item => {
        if (item.category === newData[index].category && item.order !== 1) {
          const oldValue = currentData[index].value;
          const newValue = parseFloat(newData[index].value);
          const oldIndex = currentData.findIndex(
            currentItem => currentItem.id === item.id
          );
          const percentage = (newValue - oldValue) / oldValue;
          let newItemValue = Math.round(
            currentData[oldIndex].value * percentage +
              currentData[oldIndex].value
          );
          if (!percentage) {
            newItemValue = parseFloat(currentData[oldIndex].value);
          }
          adjustedData.push({
            ...item,
            value: newItemValue,
          });
        } else {
          adjustedData.push(item);
        }
      });
      setData(adjustedData);
    } else {
      setData(newData);
    }
  };

  const handleClear = category => {
    const newData = data.map(item => {
      if (item.category === category)
        return {
          ...item,
          value: 0,
        };
      return item;
    });
    setData(newData);
  };

  return (
    <>
      <div className="mb-3">
        <SetDefault />
      </div>
      <Row>
        {categories.map(item => (
          <Col sm={12} md={4} key={item}>
            <Card>
              <Card.Body>
                <Card.Title>{item}</Card.Title>
                <Form>
                  {groupedData[item].map(groupItem => (
                    <Form.Group as={Row} key={groupItem.id}>
                      <Form.Label column sm={6}>
                        {groupItem.label}
                      </Form.Label>
                      <Col sm={6}>
                        <Form.Control
                          name={groupItem.id}
                          type="number"
                          value={groupItem.value}
                          onChange={handleChange}
                        />
                      </Col>
                    </Form.Group>
                  ))}
                </Form>
                <div className="text-right">
                  <Button
                    variant="warning"
                    onClick={() => onSave(groupedData[item])}
                    disabled={isLoading}
                  >
                    Save
                  </Button>{' '}
                  <Button variant="primary" onClick={() => handleClear(item)}>
                    Clear
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

AdjustmentList.propTypes = {
  data: arrayOf(shape({})),
  onSave: func,
  isLoading: bool,
};
AdjustmentList.defaultProps = { data: [], onSave: e => e, isLoading: false };

export default AdjustmentList;
