import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import moment from 'moment';
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
import adjustmentFields from './adjustmentFields';
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

  const fieldValues = { ...iform };

  const finished = fieldsVerticalState.find(item => item.name === 'finished');
  const percentFinished = fieldsVerticalState.find(
    item => item.name === 'percentFinished'
  );
  const condition = fieldsVerticalState.find(item => item.name === 'condition');

  const { register, setValue, handleSubmit } = useForm();

  const onSubmit = async () => {
    setLoading(true);
    try {
      await updateIform({
        variables: {
          pipelineId,
          input: removeNull(removeEmptyString(fieldValues)),
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
    const name = e.target.name;
    const value = e.target.value;
    fieldValues[name] = value;
    setTimeout(() => calculateFields(name, value), 500);
  };

  const handleAutoAssign = index => {
    const { subject } = fieldsVerticalState[index];
    const valueToAssign = fieldValues[subject.label];

    addValueToFields(fieldsVerticalState[index], valueToAssign);
  };

  const addValueToFields = (fieldSelected, valueToAssign) => {
    if (fieldSelected.name === 'basement') {
      if (valueToAssign === 'FULL') {
        compsLoop('YES', finished);
        compsLoop('100', percentFinished);
      } else if (valueToAssign === 'NONE') {
        compsLoop('NO', finished);
        compsLoop('0', percentFinished);
      }
    }

    compsLoop(valueToAssign, fieldSelected);
  };

  const compList = [
    'subject',
    'listComp1',
    'listComp2',
    'listComp3',
    'saleComp1',
    'saleComp2',
    'saleComp3',
  ];
  const noSubjComp = compList.filter(comp => comp !== 'subject');

  const compsLoop = (value, fieldSelected) => {
    compList.forEach(comp => {
      const name = Array.isArray(fieldSelected[comp])
        ? fieldSelected[comp][0].label
        : fieldSelected[comp].label;

      fieldValues[name] = value;
      setValue(name, value);
    });
  };

  const simpleSubtract = (a, b) => Number(b) - Number(a);
  const reverseSubtract = (a, b) => Number(a) - Number(b);
  const simpleDivide = (a, b) => Number(b) / Number(a);
  const reverseDivide = (a, b) => Number(a) / Number(b);
  const dateDifference = (a, b) =>
    a !== null ? Math.abs(moment(a).diff(moment(b), 'd')) : '';
  const dateAdd = (a, b) =>
    moment(a)
      .add(b, 'd')
      .format('YYYY-MM-DD');
  const reverseAdd = (a, b) =>
    moment(b)
      .add(a, 'd')
      .format('YYYY-MM-DD');

  const saleArray = [
    'txtSubject',
    'txtSaleComp1',
    'txtSaleComp2',
    'txtSaleComp3',
  ];
  const listArray = ['txtListComp1', 'txtListComp2', 'txtListComp3'];
  const newSaleArray = saleArray.filter(sale => sale !== 'txtSubject');

  const calculateFields = (name, value) => {
    const label = String(name);

    if (label.includes('SalePrice')) {
      calcFieldsLoop(
        saleArray,
        'CompTotals',
        label,
        value,
        'Adjustments',
        simpleSubtract
      );
      let secName = 'GLAAdjBuiltIn';
      let arr = newSaleArray;
      if (label.includes('txtSubject')) {
        secName = 'GLA';
        arr = ['txtSubject'];
      }
      calcFieldsLoop(arr, 'PricePerSqFt', label, value, secName, simpleDivide);
      calculatePropertyAdjustment(); // not yet properly checked
    } else if (label.includes('Adjustments')) {
      calcFieldsLoop(
        saleArray,
        'CompTotals',
        label,
        value,
        'SalePrice',
        reverseSubtract
      );
      calcFieldsLoop(
        listArray,
        'CompTotals',
        label,
        value,
        'ListPrice',
        reverseSubtract
      );
    } else if (label.includes('ListPrice')) {
      calcFieldsLoop(
        listArray,
        'CompTotals',
        label,
        value,
        'Adjustments',
        simpleSubtract
      );
    } else if (label.includes('GLA')) {
      let arr = ['txtSubject'];
      if (label.includes('GLAAdjBuiltIn')) {
        arr = newSaleArray;
      }
      calcFieldsLoop(
        arr,
        'PricePerSqFt',
        label,
        value,
        'SalePrice',
        reverseDivide
      );
      calcFieldsLoop(
        listArray,
        'PricePerSqFt',
        label,
        value,
        'ListPrice',
        reverseDivide
      );
    } else if (label.includes('OriginalListDate')) {
      calcFieldsLoop(
        saleArray,
        'DOM',
        label,
        value,
        'SaleDate',
        dateDifference
      );
      calcFieldsLoop(
        listArray,
        'DOM',
        label,
        value,
        'DateToday',
        dateDifference
      );
    } else if (label.includes('SaleDate')) {
      calcFieldsLoop(
        saleArray,
        'DOM',
        label,
        value,
        'OriginalListDate',
        dateDifference
      );
    } else if (label.includes('DOM')) {
      calcFieldsLoop(
        saleArray,
        'OriginalListDate',
        label,
        value,
        'CurrentListDate',
        dateAdd
      );
    } else if (label.includes('CurrentListDate')) {
      calcFieldsLoop(
        saleArray,
        'OriginalListDate',
        label,
        value,
        'DOM',
        reverseAdd
      );
    } else if (label.includes('Fireplace')) {
      calculatePropertyAdjustment();
    } else if (label.includes('Condition')) {
      calculateCondition();
    }
  };

  const calcFieldsLoop = (
    array,
    compTitle,
    fieldName,
    fieldValue,
    secComp,
    fxn
  ) => {
    array.every(comp => {
      if (fieldName.includes(comp)) {
        const compName = comp + compTitle;
        const secName = comp + secComp;
        const secVal =
          secComp === 'DateToday'
            ? moment().format('YYYY-MM-DD')
            : fieldValues[secName] !== undefined
            ? fieldValues[secName]
            : 0;
        const compVal = String(fxn(secVal, fieldValue));
        fieldValues[compName] = compVal;
        setValue(compName, compVal);
        return false;
      }
      return true;
    });
  };

  const getFieldValue = (composition, index = 0) => {
    if (composition !== undefined) {
      const label = Array.isArray(composition)
        ? composition[index].label
        : composition.label;
      return fieldValues[label] !== null ? fieldValues[label] : null;
    }
    return null;
  };

  const findAdjustmentOption = category => {
    return adjustmentOption.filter(item => item.category === category);
  };

  const getPropertyAdjustment = (value, adjustmentType) => {
    const result = adjustmentType.find(item => {
      const priceFrom = parseInt(item.from, 10) || 0;
      const priceTo = parseInt(item.to, 10) || 0;
      return priceFrom >= value || value <= priceTo;
    });
    return result || { value: 0 };
  };

  const salePrice = fieldsVerticalState.find(item => item.name === 'salePrice');

  const calculatePropertyAdjustment = () => {
    adjustmentFields.forEach(field => {
      const comparableField = fieldsVerticalState.find(
        item => item.comparableField === field.category
      );

      noSubjComp.forEach(comp => {
        const sPriceComp =
          salePrice[comp] && getFieldValue(salePrice[comp]) !== null
            ? parseInt(getFieldValue(salePrice[comp]), 10)
            : null;

        const saleCompAdjustmentOptions = field.merge
          ? findAdjustmentOption(getFieldValue(comparableField[comp]))
          : findAdjustmentOption(field.category);

        const compAdjustment = getPropertyAdjustment(
          sPriceComp,
          saleCompAdjustmentOptions
        ).value;

        if (field.inputType === 'cmb') {
          const fieldValue = getFieldValue(comparableField[comp], 0);

          const adjVal =
            field.category === 'Fireplace' && fieldValue === 'NO'
              ? ''
              : compAdjustment;

          setValue(comparableField[comp][1].label, adjVal);
        } else if (field.inputType === 'text') {
          const subjectField =
            parseInt(getFieldValue(comparableField.subject), 10) || 0;

          const fieldComp =
            parseInt(getFieldValue(comparableField[comp], 0), 10) || 0;

          setValue(
            comparableField[comp][1].label,
            (subjectField - fieldComp) * compAdjustment
          );
        }
      });
    });
  };

  const calculateCondition = () => {
    const { options } = condition.subject;
    const subjectLevel = options.findIndex(
      item => item.value === getFieldValue(condition.subject)
    );
    noSubjComp.forEach(comp => {
      const level = options.findIndex(
        item => item.value === getFieldValue(condition[comp])
      );

      const adjustment = getPropertyAdjustment(
        parseInt(getFieldValue(salePrice[comp]), 10) || 0,
        findAdjustmentOption('Condition')
      );
      setValue(
        condition[comp][1].label,
        (subjectLevel - level) * adjustment.value
      );
    });
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
            register={register}
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
          onClick={handleSubmit(onSubmit)}
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
