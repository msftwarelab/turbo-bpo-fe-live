import React, { useState, useEffect } from 'react';

import { useMutation } from '@apollo/react-hooks';
import setErrorMessage from 'utils/setErrorMessage';
import IFormHistory from 'components/IFormHistory';
import IFormGeneral from 'components/IFormGeneral';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
//import styleDesignOptions from 'constants/styleDesignOptions';
import cogoToast from 'cogo-toast';
import removeNull from 'utils/removeNull';
import removeEmptyString from 'utils/removeEmptyString';
import { Button, Row, Col, Form } from 'react-bootstrap';
import IFORM from 'queries/iform';
import { shape, string, func } from 'prop-types';
//import capitalize from 'utils/capitalize';
import UPDATE_IFORM from 'mutations/updateIform';
import fieldsVertical from './fieldsVertical';
import ClearFields from './components/ClearFields';
import fieldsHorizontal from './fieldsHorizontal';
import Neighborhood from './components/Neighborhood';
//import adjustmentFields from './adjustmentFields';
import ComparablesRow from './ComparablesRow';
import ComparablesComments from './ComparablesComments';

const Comparables = ({
  pipelineId,
  iform,
  adjustmentOption,
  onLoadIformTemp,
}) => {
  const [fieldsVerticalState, setFieldsVerticalState] = useState(
    fieldsVertical
  );
  const [subjectLatLng, setSubjectLatLng] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [updateIform] = useMutation(UPDATE_IFORM);

  const [finalInputFields, setFinalInputFields] = useState({});
  const [fieldValues, setFieldValues] = useState(iform);

  const finished = fieldsVerticalState.find(item => item.name === 'finished');
  const percentFinished = fieldsVerticalState.find(
    item => item.name === 'percentFinished'
  );
  const compTotals = fieldsVerticalState.find(
    item => item.name === 'compTotals'
  );

  const salePrice = fieldsVerticalState.find(item => item.name === 'salePrice');
  const listPrice = fieldsVerticalState.find(item => item.name === 'listPrice');
  const firePlace = fieldsVerticalState.find(item => item.name === 'Fireplace');
  const adjustments = fieldsVerticalState.find(
    item => item.name === 'adjustments'
  );
  const gla = fieldsVerticalState.find(item => item.name === 'gla');
  const pricePerSqFt = fieldsVerticalState.find(
    item => item.name === 'pricePerSqFt'
  );
  const originalListDate = fieldsVerticalState.find(
    item => item.name === 'originalListDate'
  );
  const currentListDate = fieldsVerticalState.find(
    item => item.name === 'currentListDate'
  );
  const saleDate = fieldsVerticalState.find(item => item.name === 'saleDate');
  const dom = fieldsVerticalState.find(item => item.name === 'dom');
  const condition = fieldsVerticalState.find(item => item.name === 'condition');
  const acres = fieldsVerticalState.find(item => item.name === 'acres');
  const squareFeet = fieldsVerticalState.find(
    item => item.name === 'squareFeet'
  );
  const proximity = fieldsVerticalState.find(item => item.name === 'proximity');
  const address = fieldsVerticalState.find(item => item.name === 'address');
  const yearBuilt = fieldsVerticalState.find(item => item.name === 'yearBuilt');
  const age = fieldsVerticalState.find(item => item.name === 'age');
  const bedRooms = fieldsVerticalState.find(item => item.name === 'bedRooms');
  const fullBaths = fieldsVerticalState.find(item => item.name === 'fullBaths');
  const halfBaths = fieldsVerticalState.find(item => item.name === 'halfBaths');
  const totalRooms = fieldsVerticalState.find(
    item => item.name === 'totalRooms'
  );
  const subjectType = fieldsVerticalState.find(
    item => item.name === 'subjectType'
  );
  const dataSource = fieldsVerticalState.find(
    item => item.name === 'dataSource'
  );
  const mlsNumber = fieldsVerticalState.find(item => item.name === 'mlsNumber');
  const saleType = fieldsVerticalState.find(item => item.name === 'saleType');
  const styleDesign = fieldsVerticalState.find(
    item => item.name === 'styleDesign'
  );
  const exteriorFinish = fieldsVerticalState.find(
    item => item.name === 'exteriorFinish'
  );
  const quality = fieldsVerticalState.find(item => item.name === 'quality');
  const hoaFee = fieldsVerticalState.find(item => item.name === 'hoaFee');
  const basementSqFt = fieldsVerticalState.find(
    item => item.name === 'basementSqFt'
  );
  const garage = fieldsVerticalState.find(item => item.name === 'garage');
  const pool = fieldsVerticalState.find(item => item.name === 'pool');
  const porchPatioDeck = fieldsVerticalState.find(
    item => item.name === 'porchPatioDeck'
  );
  const basement = fieldsVerticalState.find(item => item.name === 'basement');
  const city = fieldsVerticalState.find(item => item.name === 'city');
  const zip = fieldsVerticalState.find(item => item.name === 'zip');

  const handleSubmit = async () => {
    console.log(finalInputFields);
    setLoading(true);
    try {
      await updateIform({
        variables: {
          pipelineId,
          input: removeNull(removeEmptyString(finalInputFields)),
        },
        refetchQueries: [{ query: IFORM, variables: { pipelineId } }],
      });
      setLoading(false);
      cogoToast.success('Complete');
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };

  const getLatLngByAddress = async iformAddress => {
    const geoCodes = await geocodeByAddress(iformAddress);
    const latlng = await getLatLng(geoCodes[0]);
    return latlng || null;
  };

  useEffect(() => {
    const getSubjectLatLng = async () => {
      setSubjectLatLng(await getLatLngByAddress(iform.txtSubjectAddress));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    };
    if (!subjectLatLng) getSubjectLatLng();
  }, [subjectLatLng, iform.txtSubjectAddress]);

  /*useEffect(() => {
    initiateFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);*/

  const handleClear = e => {
    //
    //initiateFields();
  };

  const handleChange = e => {
    const { name } = e.target;
    const value = e.target.value;
    setFinalInputFields({ ...finalInputFields, [name]: value });

    if (
      isUnderComparable(salePrice, name) ||
      isUnderComparable(adjustments, name) ||
      isUnderComparable(listPrice, name)
    )
      calculateCompTotals(e);
  };

  const handleAutoAssign = index => {
    const { subject } = fieldsVerticalState[index];
    const valueToAssign = finalInputFields[subject.label];

    addValueToFields(fieldsVerticalState[index], valueToAssign);
  };

  const addValueToFields = (fieldSelected, valueToAssign) => {
    const fields = {};

    if (fieldSelected.name === 'basement') {
      if (valueToAssign === 'FULL') {
        compsLoop(fields, 'YES', finished);
        compsLoop(fields, '100', percentFinished);
      } else if (valueToAssign === 'NONE') {
        compsLoop(fields, 'NO', finished);
        compsLoop(fields, '0', percentFinished);
      }
    }

    compsLoop(fields, valueToAssign, fieldSelected);

    setFieldValues({
      ...fieldValues,
      ...fields,
    });
    setFinalInputFields({
      ...finalInputFields,
      ...fields,
    });
  };

  const compsLoop = (fields, value, fieldSelected) => {
    const comps = [
      'subject',
      'listComp1',
      'listComp2',
      'listComp3',
      'saleComp1',
      'saleComp2',
      'saleComp3',
    ];

    comps.forEach(comp => {
      const name = Array.isArray(fieldSelected[comp])
        ? fieldSelected[comp][0].label
        : fieldSelected[comp].label;

      fields[name] = value;
    });
  };

  const simpleSubtract = (a, b) => Number(a) - Number(b);

  const genCompsCalculator = (
    fieldTotals,
    comp,
    e,
    fieldName,
    firstVal,
    secVal,
    firstLabel,
    secLabel,
    fxn
  ) => {
    const name = fieldTotals[comp].label;

    let first = firstVal;
    let sec = secVal;

    if (String(fieldName).includes(firstLabel)) {
      first = e.target.value;
    } else if (String(fieldName).includes(secLabel)) {
      sec = e.target.value;
    }

    const value = fxn(first, sec);

    console.log(value);

    if (!Number.isNaN(value)) {
      setFinalInputFields({
        ...finalInputFields,
        [name]: String(value),
        [fieldName]: e.target.value,
      });
      setFieldValues({
        ...fieldValues,
        [name]: String(value),
        [fieldName]: e.target.value,
      });
    }
  };

  const calculateCompTotals = e => {
    const fieldName = e.target.name;
    ['subject', 'saleComp1', 'saleComp2', 'saleComp3'].every(comp => {
      const spName = salePrice[comp].label;
      const adName = adjustments[comp].label;
      const spVal = finalInputFields[spName];
      const adVal = finalInputFields[adName];

      if (
        (spVal !== undefined || adVal !== undefined) &&
        (fieldName == spName || fieldName == adName)
      ) {
        genCompsCalculator(
          compTotals,
          comp,
          e,
          fieldName,
          spVal,
          adVal,
          'SalePrice',
          'Adjustments',
          simpleSubtract
        );
        return false;
      }

      return true;
    });

    /*['listComp1', 'listComp2', 'listComp3'].forEach(comp => {
      setInputFieldValue(
        compTotals[comp],
        parseInt(getInputFieldValue(listPrice[comp]) || 0, 10) -
          parseInt(getInputFieldValue(adjustments[comp]) || 0, 10)
      );
    });*/
  };

  const isUnderComparable = (comparable, selectedInput, index = 1) => {
    let compsArray = [comparable.subject.label];
    if (comparable.saleComp1) {
      compsArray = [
        ...compsArray,
        ...['saleComp1', 'saleComp2', 'saleComp3'].map(comp =>
          !Array.isArray(comparable[comp])
            ? comparable[comp].label
            : comparable[comp][index].label
        ),
      ];
    }
    if (comparable.listComp1) {
      compsArray = [
        ...compsArray,
        ...['listComp1', 'listComp2', 'listComp3'].map(comp =>
          !Array.isArray(comparable[comp])
            ? comparable[comp].label
            : comparable[comp][index].label
        ),
      ];
    }

    return compsArray.includes(selectedInput);
  };

  const renderForm = () => {
    return (
      <Col>
        <Row className="mb-2 justify-content-center">
          {[
            '',
            'SUBJECT',
            'SALE COMP1',
            'SALE COMP2',
            'SALE COMP3',
            'LIST COMP1',
            'LIST COMP2',
            'LIST COMP3',
          ].map(name => (
            <Col>
              <b>{name}</b>
            </Col>
          ))}
        </Row>
        {fieldsVerticalState.map((item, index) => (
          <ComparablesRow
            index={index}
            item={item}
            fieldValues={fieldValues}
            handleChange={handleChange}
            handleAutoAssign={handleAutoAssign}
          />
        ))}
        <div className="mt-4">
          {fieldsHorizontal.map((item, index) => (
            <ComparablesComments key={index} item={item} iform={iform} />
          ))}
        </div>
      </Col>
    );
  };

  return (
    <div className="border-top-0 border p-3 bg-white">
      <div className="d-flex mb-4">
        <Button
          className="mr-2"
          variant="warning"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          Save
        </Button>
        <ClearFields onClear={handleClear} />
        <Button
          className="mr-auto"
          disabled={isLoading}
          onClick={onLoadIformTemp}
        >
          Load
        </Button>
        <div className="mr-2">
          <IFormHistory history={iform.history} />
        </div>
        <IFormGeneral pipelineId={pipelineId} iform={iform} />
      </div>
      <Form>
        <Row>
          {renderForm()}
          <Neighborhood iform={iform} />
        </Row>
      </Form>
    </div>
  );
};

Comparables.propTypes = {
  iform: shape({}),
  pipelineId: string,
  adjustmentOption: shape({}),
  onLoadIformTemp: func,
};

Comparables.defaultProps = {
  iform: {},
  pipelineId: null,
  adjustmentOption: {},
  onLoadIformTemp: e => e,
};

export default Comparables;
