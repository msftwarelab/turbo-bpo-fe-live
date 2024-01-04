import React from 'react';
import { Row, Col } from 'react-bootstrap';
import _ from 'lodash';
import ComparablesField from './ComparablesField';

const ComparablesRow = ({
  index,
  item,
  fieldValues,
  register,
  handleChange,
  handleAutoAssign,
}) => {
  const fieldsMap = { ...item };

  const extractFields = () => {
    delete fieldsMap.label;
    delete fieldsMap.name;
    return fieldsMap;
  };

  const fields = extractFields();

  const firstFields = _.pick(fields, ['subject', 'saleComp1', 'saleComp2']);
  const secFields = _.pick(fields, [
    'saleComp3',
    'listComp1',
    'listComp2',
    'listComp3',
  ]);

  const renderRow = arr => {
    return (
      <>
        {Object.keys(arr).map(field =>
          typeof arr[field] === 'object' && arr[field] !== null ? (
            <ComparablesField
              fieldObject={arr[field]}
              fieldValues={fieldValues}
              register={register}
              handleChange={handleChange}
            />
          ) : null
        )}

        {fields.listComp1 === undefined
          ? Array.from({ length: 3 }, () => <Col />)
          : null}
      </>
    );
  };

  return (
    <div>
      <Row className="mb-2" key={index}>
        <Col sm={6}>
          <Row>
            <Col className='pr-0' sm={3}>
              {item.canAutoAssign ? (
                <div
                  className="my-1"
                  onDoubleClick={() => handleAutoAssign(index)}
                >
                  <b>{item.label}</b>
                </div>
              ) : (
                <div className="my-1">{item.label}</div>
              )}
            </Col>
            {renderRow(firstFields)}
          </Row>
        </Col>
        <Col sm={6}>
          <Row>{renderRow(secFields)}</Row>
        </Col>
      </Row>
    </div>
  );
};

export default ComparablesRow;
