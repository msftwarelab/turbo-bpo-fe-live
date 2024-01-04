import React from 'react';
import moment from 'moment';
import { Col, Row, Form } from 'react-bootstrap';

const ComparablesField = ({
  fieldObject,
  fieldValues,
  register,
  handleChange,
}) => {
  let fieldContent;

  if (!Array.isArray(fieldObject)) {
    fieldContent = (
      <>
        {fieldObject.type === 'txt' && (
          <Form.Control
            {...register(fieldObject.label)}
            onChange={handleChange}
            readOnly={fieldObject.readOnly}
            name={fieldObject.label}
            defaultValue={fieldValues[fieldObject.label] || fieldObject.value}
          />
        )}
        {fieldObject.type === 'cmb' && (
          <Form.Control
            {...register(fieldObject.label)}
            onChange={handleChange}
            as="select"
            readOnly={fieldObject.readOnly}
            name={fieldObject.label}
            defaultValue={fieldValues[fieldObject.label] || fieldObject.value}
          >
            {fieldObject.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Control>
        )}
        {fieldObject.type === 'date' && (
          <Form.Control
            {...register(fieldObject.label)}
            onChange={handleChange}
            type="date"
            readOnly={fieldObject.readOnly}
            name={fieldObject.label}
            defaultValue={
              fieldValues[fieldObject.label]
                ? moment(fieldValues[fieldObject.label]).format('YYYY-MM-DD')
                : ''
            }
          />
        )}
      </>
    );
  } else if (Array.isArray(fieldObject)) {
    fieldContent = (
      <Row className='px-3'>
        {fieldObject.map((subItem, subItemKey) => (
          <Col className='px-1' key={subItemKey}>
            {subItem.type === 'txt' && subItem.label !== '' && (
              <Form.Control
                {...register(subItem.label)}
                onChange={handleChange}
                readOnly={subItem.readOnly}
                name={subItem.label}
                defaultValue={fieldValues[subItem.label] || subItem.value}
              />
            )}
            {subItem.type === 'txt' && subItem.label === '' && (
              <Form.Control
                onChange={handleChange}
                readOnly={subItem.readOnly}
                name={subItem.label}
                defaultValue={fieldValues[subItem.label] || subItem.value}
              />
            )}
            {subItem.type === 'cmb' && (
              <Form.Control
                {...register(subItem.label)}
                onChange={handleChange}
                as="select"
                readOnly={subItem.readOnly}
                name={subItem.label}
                defaultValue={fieldValues[subItem.label] || subItem.value}
              >
                {subItem.options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Control>
            )}
          </Col>
        ))}
      </Row>
    );
  }

  return <Col className='px-2' sm={3}>{fieldContent}</Col>;
};

export default ComparablesField;
