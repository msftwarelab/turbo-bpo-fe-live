import React from 'react';
import { Formik } from 'formik';
import Select from 'react-select';
import { shape, func, bool, arrayOf, string } from 'prop-types';
import { Form, Col, Row, Button, Card } from 'react-bootstrap';
import glaOptions from 'constants/glaOptions';
import ageOptions from 'constants/ageOptions';
import proximityOptions from 'constants/proximityOptions';
import salesDateOptions from 'constants/salesDateOptions';
import subjectTypeOptions from 'constants/subjectTypeOptions';
import styleDesignOptions from 'constants/styleDesignOptions';
import exteriorFinishOptions from 'constants/exteriorFinishOptions';
import conditionOptions from 'constants/conditionOptions';
import viewOptions from 'constants/viewOptions';
import poolOptions from 'constants/poolOptions';
import themeOptions from 'constants/themeOptions';
import outdoorOptions from 'constants/outdoorOptions';
import fireplaceOptions from 'constants/fireplaceOptions';
import basementOptions from 'constants/basementOptions';
import condoOptions from 'constants/condoOptions';
import multiUnitOptions from 'constants/multiUnitOptions';
import modularOptions from 'constants/modularOptions';
import sfaOptions from 'constants/sfaOptions';
import listingTypeOptions from 'constants/listingTypeOptions';
import validationSchema from './validationSchema';

const DefaultsForm = ({ initialValues, onSubmit, isLoading, roles }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({
      handleSubmit,
      handleChange,
      setFieldValue,
      errors,
      touched,
      values,
    }) => {
      const listingType = (values.listingType || '').split(',').map(item => {
        const found = listingTypeOptions.find(option => option.value === item);
        return found;
      });

      const handleListingType = e => {
        const newListingType = (e || []).map(item => item.value).join(',');
        setFieldValue('listingType', newListingType);
      };

      const handleCheckbox = name => {
        setFieldValue(name, !values[name]);
      };

      return (
        <>
          <Form onSubmit={handleSubmit}>
            <Button
              type="submit"
              disabled={isLoading}
              variant="warning"
              className="mr-auto mb-2"
            >
              Save
            </Button>
            <Row>
              <Col sm={8}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>General</Card.Title>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Pipeline theme:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          as="select"
                          name="theme"
                          onChange={handleChange}
                          value={values.theme || ''}
                          isInvalid={errors.theme && touched.theme}
                        >
                          {themeOptions.map((item, key) => (
                            <option key={key} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.initialSearchGla}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Enable email notification
                      </Form.Label>
                      <Col sm="8">
                        <Form.Check
                          type="checkbox"
                          name="isEnableEmailNotification"
                          onChange={() =>
                            handleCheckbox('isEnableEmailNotification')
                          }
                          checked={Boolean(values.isEnableEmailNotification)}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Types of listings to use:
                      </Form.Label>
                      <Col sm="8">
                        <Select
                          value={listingType}
                          options={listingTypeOptions}
                          onChange={handleListingType}
                          isMulti
                          className={
                            errors.listingType && touched.listingType
                              ? 'form-control p-0 is-invalid'
                              : ''
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.listingType}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Always submit my orders:
                      </Form.Label>
                      <Col sm="8">
                        <div
                          className={`mt-2 p-0 form-control border-0 ${
                            errors.alwayssubmitOrder &&
                            touched.alwayssubmitOrder
                              ? 'is-invalid'
                              : ''
                          }`}
                        >
                          <Form.Check
                            inline
                            name="alwayssubmitOrder"
                            type="radio"
                            label="Yes"
                            id="alwayssubmitOrder-yes"
                            onChange={() =>
                              setFieldValue('alwayssubmitOrder', true)
                            }
                            checked={values.alwayssubmitOrder === true}
                          />
                          <Form.Check
                            inline
                            name="alwayssubmitOrder"
                            type="radio"
                            label="No"
                            id="alwayssubmitOrder-no"
                            onChange={() =>
                              setFieldValue('alwayssubmitOrder', false)
                            }
                            checked={values.alwayssubmitOrder === false}
                          />
                        </div>
                        <Form.Control.Feedback type="invalid">
                          {errors.alwayssubmitOrder}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-0">
                      <Form.Label column sm="4">
                        Auto complete standby orders:
                      </Form.Label>
                      <Col sm="8">
                        <div
                          className={`mt-2 p-0 form-control border-0 ${
                            errors.autoCompleteStandbyOrder &&
                            touched.autoCompleteStandbyOrder
                              ? 'is-invalid'
                              : ''
                          }`}
                        >
                          <Form.Check
                            inline
                            name="autoCompleteStandbyOrder"
                            type="radio"
                            label="Yes"
                            id="autoCompleteStandbyOrder-yes"
                            onChange={() =>
                              setFieldValue('autoCompleteStandbyOrder', true)
                            }
                            checked={values.autoCompleteStandbyOrder === true}
                          />
                          <Form.Check
                            inline
                            name="autoCompleteStandbyOrder"
                            type="radio"
                            label="No"
                            id="autoCompleteStandbyOrder-no"
                            onChange={() =>
                              setFieldValue('autoCompleteStandbyOrder', false)
                            }
                            checked={values.autoCompleteStandbyOrder === false}
                          />
                        </div>
                        <Form.Control.Feedback type="invalid">
                          {errors.autoCompleteStandbyOrder}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                  </Card.Body>
                </Card>

                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Initial search</Card.Title>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        GLA:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          as="select"
                          name="initialSearchGla"
                          onChange={handleChange}
                          value={values.initialSearchGla || ''}
                          isInvalid={
                            errors.initialSearchGla && touched.initialSearchGla
                          }
                        >
                          {glaOptions.map((item, key) => (
                            <option key={key} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.initialSearchGla}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Age:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          as="select"
                          name="initialSearchAge"
                          onChange={handleChange}
                          value={values.initialSearchAge || ''}
                          isInvalid={
                            errors.initialSearchAge && touched.initialSearchAge
                          }
                        >
                          {ageOptions.map((item, key) => (
                            <option key={key} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.initialSearchAge}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-0">
                      <Form.Label column sm="4">
                        Proximity:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          as="select"
                          name="initialSearchProximity"
                          onChange={handleChange}
                          value={values.initialSearchProximity || ''}
                          isInvalid={
                            errors.initialSearchProximity &&
                            touched.initialSearchProximity
                          }
                        >
                          {proximityOptions.map((item, key) => (
                            <option key={key} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.initialSearchProximity}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                  </Card.Body>
                </Card>

                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Second search (Expanded Criteria)</Card.Title>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        GLA:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          as="select"
                          name="secondSearchGla"
                          onChange={handleChange}
                          value={values.secondSearchGla || ''}
                          isInvalid={
                            errors.secondSearchGla && touched.secondSearchGla
                          }
                        >
                          {glaOptions.map((item, key) => (
                            <option key={key} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.secondSearchGla}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Age:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          as="select"
                          name="secondSearchAge"
                          onChange={handleChange}
                          value={values.secondSearchAge || ''}
                          isInvalid={
                            errors.secondSearchAge && touched.secondSearchAge
                          }
                        >
                          {ageOptions.map((item, key) => (
                            <option key={key} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.secondSearchAge}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Proximity:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          as="select"
                          name="secondSearchProximity"
                          onChange={handleChange}
                          value={values.secondSearchProximity || ''}
                          isInvalid={
                            errors.secondSearchProximity &&
                            touched.secondSearchProximity
                          }
                        >
                          {proximityOptions.map((item, key) => (
                            <option key={key} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.secondSearchProximity}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-0">
                      <Form.Label column sm="4">
                        Sale dates:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          as="select"
                          name="secondSearchSaleDates"
                          onChange={handleChange}
                          value={values.secondSearchSaleDates || ''}
                          isInvalid={
                            errors.secondSearchSaleDates &&
                            touched.secondSearchSaleDates
                          }
                        >
                          {salesDateOptions.map((item, key) => (
                            <option key={key} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.secondSearchSaleDates}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                  </Card.Body>
                </Card>

                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>
                      Third search (Further Expanded Criteria)
                    </Card.Title>
                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        GLA:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          as="select"
                          name="thirdSearchGla"
                          onChange={handleChange}
                          value={values.thirdSearchGla || ''}
                          isInvalid={
                            errors.thirdSearchGla && touched.thirdSearchGla
                          }
                        >
                          {glaOptions.map((item, key) => (
                            <option key={key} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.thirdSearchGla}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Age:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          as="select"
                          name="thirdSearchAge"
                          onChange={handleChange}
                          value={values.thirdSearchAge || ''}
                          isInvalid={
                            errors.thirdSearchAge && touched.thirdSearchAge
                          }
                        >
                          {ageOptions.map((item, key) => (
                            <option key={key} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.thirdSearchAge}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Proximity:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          as="select"
                          name="thirdSearchProximity"
                          onChange={handleChange}
                          value={values.thirdSearchProximity || ''}
                          isInvalid={
                            errors.thirdSearchProximity &&
                            touched.thirdSearchProximity
                          }
                        >
                          {proximityOptions.map((item, key) => (
                            <option key={key} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.thirdSearchProximity}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Sale dates:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          as="select"
                          name="thirdSearchSaleDates"
                          onChange={handleChange}
                          value={values.thirdSearchSaleDates || ''}
                          isInvalid={
                            errors.thirdSearchSaleDates &&
                            touched.thirdSearchSaleDates
                          }
                        >
                          {salesDateOptions.map((item, key) => (
                            <option key={key} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.thirdSearchSaleDates}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Filter by complex name?:
                      </Form.Label>
                      <Col sm="8">
                        <div
                          className={`mt-2 p-0 form-control border-0 ${
                            errors.thirdSearchFilterByComplexName &&
                            touched.thirdSearchFilterByComplexName
                              ? 'is-invalid'
                              : ''
                          }`}
                        >
                          <Form.Check
                            inline
                            name="thirdSearchFilterByComplexName"
                            type="radio"
                            label="Yes"
                            id="thirdSearchFilterByComplexName-yes"
                            onChange={() =>
                              setFieldValue(
                                'thirdSearchFilterByComplexName',
                                true
                              )
                            }
                            checked={
                              values.thirdSearchFilterByComplexName === true
                            }
                          />
                          <Form.Check
                            inline
                            name="thirdSearchFilterByComplexName"
                            type="radio"
                            label="No"
                            id="thirdSearchFilterByComplexName-no"
                            onChange={() =>
                              setFieldValue(
                                'thirdSearchFilterByComplexName',
                                false
                              )
                            }
                            checked={
                              values.thirdSearchFilterByComplexName === false
                            }
                          />
                        </div>
                        <Form.Control.Feedback type="invalid">
                          {errors.thirdSearchFilterByComplexName}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Filter by city?:
                      </Form.Label>
                      <Col sm="8">
                        <div
                          className={`mt-2 p-0 form-control border-0 ${
                            errors.thirdSearchFilterByCity &&
                            touched.thirdSearchFilterByCity
                              ? 'is-invalid'
                              : ''
                          }`}
                        >
                          <Form.Check
                            inline
                            name="thirdSearchFilterByCity"
                            type="radio"
                            label="Yes"
                            id="thirdSearchFilterByCity-yes"
                            onChange={() =>
                              setFieldValue('thirdSearchFilterByCity', true)
                            }
                            checked={values.thirdSearchFilterByCity === true}
                          />
                          <Form.Check
                            inline
                            name="thirdSearchFilterByCity"
                            type="radio"
                            label="No"
                            id="thirdSearchFilterByCity-no"
                            onChange={() =>
                              setFieldValue('thirdSearchFilterByCity', false)
                            }
                            checked={values.thirdSearchFilterByCity === false}
                          />
                        </div>
                        <Form.Control.Feedback type="invalid">
                          {errors.thirdSearchFilterByCity}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column sm="4">
                        Filter by zip?:
                      </Form.Label>
                      <Col sm="8">
                        <div
                          className={`mt-2 p-0 form-control border-0 ${
                            errors.thirdSearchFilterByZip &&
                            touched.thirdSearchFilterByZip
                              ? 'is-invalid'
                              : ''
                          }`}
                        >
                          <Form.Check
                            inline
                            name="thirdSearchFilterByZip"
                            type="radio"
                            label="Yes"
                            id="thirdSearchFilterByZip-yes"
                            onChange={() =>
                              setFieldValue('thirdSearchFilterByZip', true)
                            }
                            checked={values.thirdSearchFilterByZip === true}
                          />
                          <Form.Check
                            inline
                            name="thirdSearchFilterByZip"
                            type="radio"
                            label="No"
                            id="thirdSearchFilterByZip-no"
                            onChange={() =>
                              setFieldValue('thirdSearchFilterByZip', false)
                            }
                            checked={values.thirdSearchFilterByZip === false}
                          />
                        </div>
                        <Form.Control.Feedback type="invalid">
                          {errors.thirdSearchFilterByZip}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-0">
                      <Form.Label column sm="4">
                        Filter by county?:
                      </Form.Label>
                      <Col sm="8">
                        <div
                          className={`mt-2 p-0 form-control border-0 ${
                            errors.thirdSearchFilterByCountry &&
                            touched.thirdSearchFilterByCountry
                              ? 'is-invalid'
                              : ''
                          }`}
                        >
                          <Form.Check
                            inline
                            name="thirdSearchFilterByCountry"
                            type="radio"
                            label="Yes"
                            id="thirdSearchFilterByCountry-yes"
                            onChange={() =>
                              setFieldValue('thirdSearchFilterByCountry', true)
                            }
                            checked={values.thirdSearchFilterByCountry === true}
                          />
                          <Form.Check
                            inline
                            name="thirdSearchFilterByCountry"
                            type="radio"
                            label="No"
                            id="thirdSearchFilterByCountry-no"
                            onChange={() =>
                              setFieldValue('thirdSearchFilterByCountry', false)
                            }
                            checked={
                              values.thirdSearchFilterByCountry === false
                            }
                          />
                        </div>
                        <Form.Control.Feedback type="invalid">
                          {errors.thirdSearchFilterByCountry}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            {roles.includes('CLIENT') && (
              <Row>
                <Col sm={4}>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>General</Card.Title>

                      <Form.Group as={Row}>
                        <Form.Label column sm="6">
                          Use Defaults:
                        </Form.Label>
                        <Col sm="6">
                          <div
                            className={`mt-2 p-0 form-control border-0 ${
                              errors.useDefaults && touched.useDefaults
                                ? 'is-invalid'
                                : ''
                            }`}
                          >
                            <Form.Check
                              inline
                              name="useDefaults"
                              type="radio"
                              label="Yes"
                              id="useDefaults-yes"
                              onChange={() =>
                                setFieldValue('useDefaults', true)
                              }
                              checked={values.useDefaults === true}
                            />
                            <Form.Check
                              inline
                              name="useDefaults"
                              type="radio"
                              label="No"
                              id="useDefaults-no"
                              onChange={() =>
                                setFieldValue('useDefaults', false)
                              }
                              checked={values.useDefaults === false}
                            />
                          </div>
                          <Form.Control.Feedback type="invalid">
                            {errors.useDefaults}
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="mb-0">
                        <Form.Label column sm="6">
                          Use iForm Validations:
                        </Form.Label>
                        <Col sm="6">
                          <div
                            className={`mt-2 p-0 form-control border-0 ${
                              errors.useIformValidations &&
                              touched.useIformValidations
                                ? 'is-invalid'
                                : ''
                            }`}
                          >
                            <Form.Check
                              inline
                              name="useIformValidations"
                              type="radio"
                              label="Yes"
                              id="useIformValidations-yes"
                              onChange={() =>
                                setFieldValue('useIformValidations', true)
                              }
                              checked={values.useIformValidations === true}
                            />
                            <Form.Check
                              inline
                              name="useIformValidations"
                              type="radio"
                              label="No"
                              id="useIformValidations-no"
                              onChange={() =>
                                setFieldValue('useIformValidations', false)
                              }
                              checked={values.useIformValidations === false}
                            />
                          </div>
                          <Form.Control.Feedback type="invalid">
                            {errors.useIformValidations}
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={4}>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>Main</Card.Title>
                      <Form.Group as={Row}>
                        <Form.Label column sm="5">
                          Subject Type:
                        </Form.Label>
                        <Col sm="7">
                          <Form.Control
                            as="select"
                            name="subjectType"
                            onChange={handleChange}
                            value={values.subjectType || ''}
                            isInvalid={
                              errors.subjectType && touched.subjectType
                            }
                          >
                            {subjectTypeOptions.map((item, key) => (
                              <option key={key} value={item.value}>
                                {item.label}
                              </option>
                            ))}
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">
                            {errors.subjectType}
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row}>
                        <Form.Label column sm="5">
                          Style design:
                        </Form.Label>
                        <Col sm="7">
                          <Form.Control
                            as="select"
                            name="styleDesign"
                            onChange={handleChange}
                            value={values.styleDesign || ''}
                            isInvalid={
                              errors.styleDesign && touched.styleDesign
                            }
                          >
                            {styleDesignOptions.map((item, key) => (
                              <option key={key} value={item.value}>
                                {item.label}
                              </option>
                            ))}
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">
                            {errors.styleDesign}
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row}>
                        <Form.Label column sm="5">
                          Exterior Finish:
                        </Form.Label>
                        <Col sm="7">
                          <Form.Control
                            as="select"
                            name="exteriorFinish"
                            onChange={handleChange}
                            value={values.exteriorFinish || ''}
                            isInvalid={
                              errors.exteriorFinish && touched.exteriorFinish
                            }
                          >
                            {exteriorFinishOptions.map((item, key) => (
                              <option key={key} value={item.value}>
                                {item.label}
                              </option>
                            ))}
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">
                            {errors.exteriorFinish}
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row}>
                        <Form.Label column sm="5">
                          Condition:
                        </Form.Label>
                        <Col sm="7">
                          <Form.Control
                            as="select"
                            name="condition"
                            onChange={handleChange}
                            value={values.condition || ''}
                            isInvalid={errors.condition && touched.condition}
                          >
                            {conditionOptions.map((item, key) => (
                              <option key={key} value={item.value}>
                                {item.label}
                              </option>
                            ))}
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">
                            {errors.condition}
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row}>
                        <Form.Label column sm="5">
                          Quality:
                        </Form.Label>
                        <Col sm="7">
                          <Form.Control
                            as="select"
                            name="quality"
                            onChange={handleChange}
                            value={values.quality || ''}
                            isInvalid={errors.quality && touched.quality}
                          >
                            {conditionOptions.map((item, key) => (
                              <option key={key} value={item.value}>
                                {item.label}
                              </option>
                            ))}
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">
                            {errors.quality}
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row}>
                        <Form.Label column sm="5">
                          View:
                        </Form.Label>
                        <Col sm="7">
                          <Form.Control
                            as="select"
                            name="view"
                            onChange={handleChange}
                            value={values.view || ''}
                            isInvalid={errors.view && touched.view}
                          >
                            {viewOptions.map((item, key) => (
                              <option key={key} value={item.value}>
                                {item.label}
                              </option>
                            ))}
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">
                            {errors.view}
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row}>
                        <Form.Label column sm="5">
                          Pool:
                        </Form.Label>
                        <Col sm="7">
                          <Form.Control
                            as="select"
                            name="pool"
                            onChange={handleChange}
                            value={values.pool || ''}
                            isInvalid={errors.pool && touched.pool}
                          >
                            {poolOptions.map((item, key) => (
                              <option key={key} value={item.value}>
                                {item.label}
                              </option>
                            ))}
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">
                            {errors.pool}
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row}>
                        <Form.Label column sm="5">
                          Porch/Patio/Deck:
                        </Form.Label>
                        <Col sm="7">
                          <Form.Control
                            as="select"
                            name="porchPatioDeck"
                            onChange={handleChange}
                            value={values.porchPatioDeck || ''}
                            isInvalid={
                              errors.porchPatioDeck && touched.porchPatioDeck
                            }
                          >
                            {outdoorOptions.map((item, key) => (
                              <option key={key} value={item.value}>
                                {item.label}
                              </option>
                            ))}
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">
                            {errors.porchPatioDeck}
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row}>
                        <Form.Label column sm="5">
                          Fireplace:
                        </Form.Label>
                        <Col sm="7">
                          <Form.Control
                            as="select"
                            name="firePlace"
                            onChange={handleChange}
                            value={values.firePlace}
                            isInvalid={errors.firePlace && touched.firePlace}
                          >
                            {fireplaceOptions.map((item, key) => (
                              <option key={key} value={item.value}>
                                {item.label}
                              </option>
                            ))}
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">
                            {errors.firePlace}
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row}>
                        <Form.Label column sm="5">
                          Basement:
                        </Form.Label>
                        <Col sm="7">
                          <Form.Control
                            as="select"
                            name="basement"
                            onChange={handleChange}
                            value={values.basement || ''}
                            isInvalid={errors.basement && touched.basement}
                          >
                            {basementOptions.map((item, key) => (
                              <option key={key} value={item.value}>
                                {item.label}
                              </option>
                            ))}
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">
                            {errors.basement}
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={4}>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>Style/Design</Card.Title>
                      <Form.Group as={Row}>
                        <Form.Label column sm="5">
                          Condo:
                        </Form.Label>
                        <Col sm="7">
                          <Form.Control
                            as="select"
                            name="condo"
                            onChange={handleChange}
                            value={values.condo || ''}
                            isInvalid={errors.condo && touched.condo}
                          >
                            {condoOptions.map((item, key) => (
                              <option key={key} value={item.value}>
                                {item.label}
                              </option>
                            ))}
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">
                            {errors.condo}
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row}>
                        <Form.Label column sm="5">
                          Style design:
                        </Form.Label>
                        <Col sm="7">
                          <Form.Control
                            as="select"
                            name="multiUnit"
                            onChange={handleChange}
                            value={values.multiUnit || ''}
                            isInvalid={errors.multiUnit && touched.multiUnit}
                          >
                            {multiUnitOptions.map((item, key) => (
                              <option key={key} value={item.value}>
                                {item.label}
                              </option>
                            ))}
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">
                            {errors.multiUnit}
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row}>
                        <Form.Label column sm="5">
                          Modular:
                        </Form.Label>
                        <Col sm="7">
                          <Form.Control
                            as="select"
                            name="mobileHome"
                            onChange={handleChange}
                            value={values.mobileHome || ''}
                            isInvalid={errors.mobileHome && touched.mobileHome}
                          >
                            {modularOptions.map((item, key) => (
                              <option key={key} value={item.value}>
                                {item.label}
                              </option>
                            ))}
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">
                            {errors.mobileHome}
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row}>
                        <Form.Label column sm="5">
                          SFD:
                        </Form.Label>
                        <Col sm="7">
                          <Form.Control
                            as="select"
                            name="sfd"
                            onChange={handleChange}
                            value={values.sfd || ''}
                            isInvalid={errors.sfd && touched.sfd}
                          >
                            {styleDesignOptions.map((item, key) => (
                              <option key={key} value={item.value}>
                                {item.label}
                              </option>
                            ))}
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">
                            {errors.sfd}
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row}>
                        <Form.Label column sm="5">
                          SFA/Townhouse:
                        </Form.Label>
                        <Col sm="7">
                          <Form.Control
                            as="select"
                            name="sfaTownhouse"
                            onChange={handleChange}
                            value={values.sfaTownhouse || ''}
                            isInvalid={
                              errors.sfaTownhouse && touched.sfaTownhouse
                            }
                          >
                            {sfaOptions.map((item, key) => (
                              <option key={key} value={item.value}>
                                {item.label}
                              </option>
                            ))}
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">
                            {errors.sfaTownhouse}
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}
          </Form>
        </>
      );
    }}
  </Formik>
);

DefaultsForm.propTypes = {
  initialValues: shape({}),
  onSubmit: func,
  roles: arrayOf(string),
  isLoading: bool,
};

DefaultsForm.defaultProps = {
  initialValues: {},
  onSubmit: e => e,
  roles: [],
  isLoading: false,
};

export default DefaultsForm;
