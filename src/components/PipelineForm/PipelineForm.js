import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { shape, func, bool, arrayOf } from 'prop-types';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import getGeoLocation from 'utils/getGeoLocation';
import UserSelectById from 'components/UserSelectById';
import locationOptions from 'constants/locationOptions';
import orderTypeOptions from 'constants/orderTypeOptions';
import objectiveOptions from 'constants/objectiveOptions';
import orderStatusOptions, {
  contractorOrderStatusOptions,
} from 'constants/orderStatusOptions';
import mlsOptions from 'constants/mlsOptions';
import GoogleMaps from 'components/GoogleMaps';
import AssignFormControl from 'components/AssignFormControl';
import LocationSearchInput from 'components/LocationSearchInput';
import CompanySelect from 'components/CompanySelect';
import { useMe } from 'contexts/Me';
import setCurrency from 'utils/setCurrency';
import setOrderFee from 'utils/setOrderFee';

import TurboLoad from 'components/TurboLoad';
import PipelineHistoryModal from 'components/PipelineHistoryModal';
import CancelPipeline from 'components/CancelPipeline';
import HoldPipeline from 'components/HoldPipeline';
import UnHoldPipeline from 'components/UnHoldPipeline';
import setPriceModule from 'utils/setPriceModule';
import validationSchema from './validationSchema';

const PipelineForm = ({
  initialValues,
  onSubmit,
  isLoading,
  pipelineState,
  pipelineHistory,
}) => {
  const { me } = useMe();
  const isAdmin = me.roles.includes('ADMIN');
  const isClient = me.roles.includes('CLIENT');
  const [priceModule, setNewPriceModule] = useState(pipelineState);

  useEffect(() => {
    setNewPriceModule(pipelineState);
  }, [pipelineState]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {({
        handleSubmit,
        handleChange,
        setFieldValue,
        errors,
        touched,
        values,
      }) => {
        let statusOptions = orderStatusOptions;

        const orderFee = setOrderFee(values, priceModule);

        if (me.roles.includes('CONTRACTOR')) {
          statusOptions = contractorOrderStatusOptions;
        }

        if (!values.pipelinePhotoTotal) {
          statusOptions = statusOptions.filter(
            item => item.value !== 'COMPLETE'
          );
        }

        if (values.pipelinePhotoTotal) {
          statusOptions = statusOptions.filter(
            item => item.value !== 'STANDBY'
          );
        }

        const handlePreSubmit = async e => {
          e.preventDefault();
          if (values.assignId !== me.id) {
            await setFieldValue('orderFee', orderFee);
            await setFieldValue('totalFee', orderFee);
          }
          await handleSubmit();
        };

        const handleChangeAddress = async address => {
          setFieldValue('address', address);
          const geoCodes = await geocodeByAddress(address);
          const latlng = await getLatLng(geoCodes[0]);
          if (geoCodes[0]) {
            geoCodes[0].address_components.map(item => {
              if (item.types.includes('administrative_area_level_2')) {
                setFieldValue('country', item.long_name);
              }
              return false;
            });
          }

          const location = await getGeoLocation(latlng);
          setFieldValue('zipCode', location.zipCode);
          setFieldValue('location', location.populationDensity);
          setFieldValue('latlng', latlng);
        };

        const handleAssign = e => {
          const { value } = e.target;
          if (value === 'Turbo BPO') {
            setFieldValue('assignId', null);
          }
          if (value === `${me.firstName} ${me.lastName}`) {
            setFieldValue('assignId', me.id);
          }
          setFieldValue('assign', value);
        };

        const handleCompanySelect = e => {
          setFieldValue('companyId', e.id);
          setFieldValue('company', e.name);
          if (e.id !== 'OTHERS') {
            setFieldValue('otherCompany', null);
          }
        };

        const handlePremiumCompanySelect = async e => {
          setFieldValue('premiumCompanyId', e.id);
          setFieldValue('premiumCompany', e.name);
          if (values.companyId !== 'OTHERS') {
            setFieldValue('premiumCompanyId', null);
            setFieldValue('premiumCompany', null);
          }
        };

        const handleCancel = async reason => {
          await setFieldValue('status', 'CANCEL');
          await setFieldValue('cancelRemarks', reason);
          await handleSubmit();
        };

        const handleHold = async reason => {
          await setFieldValue('isHold', true);
          await setFieldValue('holdRemarks', reason);
          await handleSubmit();
        };

        const handleUnHold = async reason => {
          await setFieldValue('isHold', false);
          await setFieldValue('unHoldRemarks', reason);
          await handleSubmit();
        };

        const handleAuthor = author => {
          const { priceModule: userPriceModule } = author.detailed;
          setFieldValue('authorId', author.value);
          setNewPriceModule(setPriceModule(userPriceModule, pipelineState));
        };

        let canCancelPipeline = values.status === 'ACTIVE' || !values.assignId;
        canCancelPipeline = me.permissionList.includes('CANCEL_PIPELINE')
          ? true
          : canCancelPipeline;

        const disabled = values.isEdit
          ? !me.permissionList.includes('UPDATE_PIPELINE')
          : false;

        return (
          <Form onSubmit={handlePreSubmit}>
            <div className="mb-3 d-flex">
              <div className="d-flex ml-auto">
                {values.isEdit &&
                  me.permissionList.includes('CAN_HOLD_PIPELINE_ORDER') && (
                    <div className="mr-2">
                      {values.isHold ? (
                        <UnHoldPipeline
                          onUnHold={handleUnHold}
                          isLoading={isLoading}
                        />
                      ) : (
                        <HoldPipeline
                          onHold={handleHold}
                          isLoading={isLoading}
                        />
                      )}
                    </div>
                  )}
                {me.permissionList.includes('CREATE_PIPELINE') &&
                  !values.isEdit && (
                    <Button
                      type="submit"
                      variant="warning"
                      className="mr-2"
                      disabled={isLoading}
                    >
                      Create
                    </Button>
                  )}
                {me.permissionList.includes('UPDATE_PIPELINE') &&
                  values.isEdit && (
                    <Button
                      type="submit"
                      variant="warning"
                      className="mr-2"
                      disabled={isLoading}
                    >
                      Save
                    </Button>
                  )}
                {values.isEdit && (
                  <div className="mr-2">
                    <PipelineHistoryModal pipelineHistory={pipelineHistory} />
                  </div>
                )}
                {canCancelPipeline && values.isEdit && (
                  <CancelPipeline
                    onCancel={handleCancel}
                    isLoading={isLoading}
                  />
                )}
              </div>
            </div>
            <Row>
              <Col sm="4">
                {values.isEdit && !isClient && (
                  <Form.Group as={Row}>
                    <Form.Label column sm="4">
                      Status
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        as="select"
                        name="status"
                        onChange={handleChange}
                        disabled={disabled}
                        value={values.status || ''}
                        isInvalid={errors.status && touched.status}
                      >
                        <option value="">Select one</option>
                        {statusOptions.map(item =>
                          !values.pipelinePhotoTotal &&
                          item.value === 'COMPLETE' ? (
                            ''
                          ) : (
                            <option value={item.value}>{item.label}</option>
                          )
                        )}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.status}
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                )}
                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    Order no.
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      name="orderNumber"
                      placeholder="Order Number"
                      onChange={handleChange}
                      value={values.orderNumber || ''}
                      isInvalid={errors.orderNumber && touched.orderNumber}
                      readOnly={values.isEdit}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.orderNumber}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                {values.hasAuthor && (
                  <Form.Group as={Row}>
                    <Form.Label column sm="4">
                      Client/Agent
                    </Form.Label>
                    <Col sm="8">
                      <UserSelectById
                        returnValue="OBJECT"
                        onChange={handleAuthor}
                        userRoles={['CLIENT']}
                        disabled={disabled}
                        value={values.authorId || ''}
                      />
                      {errors.authorId && touched.authorId && (
                        <div className="text-danger">
                          <small>{errors.authorId}</small>
                        </div>
                      )}
                    </Col>
                  </Form.Group>
                )}

                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    Address
                  </Form.Label>
                  <Col sm="8">
                    <LocationSearchInput
                      value={values.address}
                      onChange={handleChangeAddress}
                      disabled={disabled}
                      isInvalid={errors.address && touched.address}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.address}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    County
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      name="country"
                      placeholder="County"
                      onChange={handleChange}
                      value={values.country || ''}
                      disabled={disabled}
                      isInvalid={errors.country && touched.country}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.country}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    Location
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      as="select"
                      name="location"
                      onChange={handleChange}
                      value={values.location || ''}
                      disabled={disabled}
                      isInvalid={errors.location && touched.location}
                    >
                      <option value="">Select one</option>
                      {locationOptions.map((item, key) => (
                        <option key={key} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.location}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    Company
                  </Form.Label>
                  <Col sm="8">
                    <CompanySelect
                      name="companyId"
                      returnValue="OBJECT"
                      isPremium={false}
                      isAdmin={isAdmin}
                      isClient={isClient}
                      onChange={e => handleCompanySelect(e)}
                      value={values.companyId || ''}
                      disabled={disabled}
                      isInvalid={errors.companyId && touched.companyId}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.companyId}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                {values.companyId === 'OTHERS' && (
                  <Form.Group as={Row}>
                    <Form.Label column sm="4">
                      Premium
                    </Form.Label>
                    <Col sm="8">
                      <CompanySelect
                        isPremium
                        name="premiumCompanyId"
                        returnValue="OBJECT"
                        isAdmin={isAdmin}
                        isClient={isClient}
                        onChange={e => handlePremiumCompanySelect(e)}
                        disabled={disabled}
                        value={values.premiumCompanyId || ''}
                        isInvalid={
                          errors.premiumCompanyId && touched.premiumCompanyId
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.premiumCompanyId}
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                )}

                {values.premiumCompanyId === 'OTHERS' && (
                  <Form.Group as={Row}>
                    <Form.Label column sm="4">
                      Custom
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        name="otherCompany"
                        onChange={handleChange}
                        disabled={disabled}
                        value={values.otherCompany || ''}
                        isInvalid={errors.otherCompany && touched.otherCompany}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.otherCompany}
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                )}

                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    Type
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      name="type"
                      as="select"
                      placeholder="type"
                      onChange={handleChange}
                      disabled={disabled}
                      value={values.type || ''}
                      isInvalid={errors.type && touched.type}
                    >
                      <option>Order</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.type}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    Order type
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      as="select"
                      name="orderType"
                      onChange={handleChange}
                      disabled={disabled}
                      value={values.orderType || ''}
                      isInvalid={errors.orderType && touched.orderType}
                    >
                      <option value="">Select one</option>
                      {orderTypeOptions.map((item, key) => (
                        <option key={key} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.orderType}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                {values.orderType === 'Interior' && (
                  <Form.Group as={Row}>
                    <Form.Label column sm="4">
                      Objective
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        as="select"
                        name="objective"
                        onChange={handleChange}
                        disabled={disabled}
                        value={values.objective || ''}
                        isInvalid={errors.objective && touched.objective}
                      >
                        <option value="">Select one</option>
                        {objectiveOptions.map((item, key) => (
                          <option key={key} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.objective}
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                )}

                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    Assign
                  </Form.Label>
                  <Col sm="8">
                    <AssignFormControl
                      onChange={handleAssign}
                      errors={errors}
                      disabled={disabled}
                      touched={touched}
                      value={values.assign}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    MLS
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      as="select"
                      name="mls"
                      onChange={handleChange}
                      value={values.mls || ''}
                      disabled={disabled}
                      isInvalid={errors.mls && touched.mls}
                    >
                      <option value="">Select one</option>
                      {mlsOptions.map((item, key) => (
                        <option key={key} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.mls}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Row>
                  <Col sm={{ span: 8, offset: 4 }}>
                    <Form.Check
                      className="mb-3"
                      id="isRushOrder"
                      checked={values.isRushOrder || false}
                      type="checkbox"
                      label="Rush Order (6 Hrs)"
                      disabled={disabled}
                      onChange={() => {
                        setFieldValue('isRushOrder', !values.isRushOrder);
                        setFieldValue('isSuperRush', false);
                      }}
                    />
                    <Form.Check
                      id="isSuperRush"
                      className="mb-3"
                      checked={values.isSuperRush || false}
                      type="checkbox"
                      label="Super Rush (2 Hrs)"
                      disabled={disabled}
                      onChange={() => {
                        setFieldValue('isSuperRush', !values.isSuperRush);
                        setFieldValue('isRushOrder', false);
                      }}
                    />
                    <Form.Check
                      id="isInspection"
                      className="mb-3"
                      checked={values.isInspection || false}
                      type="checkbox"
                      label="Inspection"
                      disabled={disabled}
                      onChange={() =>
                        setFieldValue('isInspection', !values.isInspection)
                      }
                    />
                    <Form.Check
                      id="isInitialBpo"
                      className="mb-3"
                      checked={values.isInitialBpo || false}
                      type="checkbox"
                      label="Initial BPO"
                      disabled={disabled}
                      onChange={() =>
                        setFieldValue('isInitialBpo', !values.isInitialBpo)
                      }
                    />
                  </Col>
                </Row>

                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    Order Fee
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      placeholder="Order Fee"
                      name="orderFee"
                      readOnly
                      value={setCurrency(
                        'USD',
                        values.status === 'STANDBY' || values.assignId === me.id
                          ? 0
                          : orderFee,
                        2
                      )}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm="4">
                    Total Fee
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      placeholder="Total Fee"
                      name="totalFee"
                      readOnly
                      value={setCurrency(
                        'USD',
                        values.status === 'STANDBY' || values.assignId === me.id
                          ? 0
                          : orderFee,
                        2
                      )}
                    />
                  </Col>
                </Form.Group>
                {values.assign === 'Turbo BPO' && <TurboLoad />}
              </Col>
              <Col sm={8}>
                {values.latlng && (
                  <GoogleMaps
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCvFnh72jnj11SHQ7J9gthY27U20LOwDds&v=3.exp&libraries=geometry,drawing,places`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    latlng={values.latlng}
                    isMarkerShown
                  />
                )}
              </Col>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

PipelineForm.propTypes = {
  initialValues: shape({}),
  onSubmit: func,
  isLoading: bool,
  pipelineState: shape({}),
  pipelineHistory: arrayOf(shape({})),
};

PipelineForm.defaultProps = {
  initialValues: {},
  onSubmit: e => e,
  isLoading: false,
  pipelineState: {},
  pipelineHistory: [],
};

export default PipelineForm;
