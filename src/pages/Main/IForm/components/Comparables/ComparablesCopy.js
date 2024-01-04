import React, { useRef, useState, useEffect } from 'react';
import mapKeys from 'lodash/mapKeys';
import moment from 'moment';
import { useMutation } from '@apollo/react-hooks';
import setErrorMessage from 'utils/setErrorMessage';
import IFormHistory from 'components/IFormHistory';
import IFormGeneral from 'components/IFormGeneral';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import styleDesignOptions from 'constants/styleDesignOptions';
import cogoToast from 'cogo-toast';
import removeNull from 'utils/removeNull';
import removeEmptyString from 'utils/removeEmptyString';
import { Button, Col, Form } from 'react-bootstrap';
import Datetime from 'react-datetime';
import IFORM from 'queries/iform';
import { shape, string, func } from 'prop-types';
import capitalize from 'utils/capitalize';
import UPDATE_IFORM from 'mutations/updateIform';
import fieldsVertical from './fieldsVertical';
import ClearFields from './components/ClearFields';
import fieldsHorizontal from './fieldsHorizontal';
import Neighborhood from './components/Neighborhood/NeighborhoodCopy';
import adjustmentFields from './adjustmentFields';

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

  const inputRef = useRef({});
  const [finalInputFields, setFinalInputFields] = useState({});

  const handleSubmit = async () => {
    const newInputs = {};
    // note: only for finalizing the inputs to be posted
    mapKeys(inputRef.current, (input, key) => {
      if (key && input) newInputs[key] = input.value;
    });

    setLoading(true);
    try {
      await updateIform({
        variables: {
          pipelineId,
          input: removeNull(removeEmptyString(newInputs)),
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

  const subjectTypeFields = [
    zip,
    city,
    basement,
    porchPatioDeck,
    garage,
    pool,

    basementSqFt,
    hoaFee,
    quality,
    exteriorFinish,
    styleDesign,
    saleType,
    dataSource,
    mlsNumber,
    finished,
    percentFinished,
    compTotals,
    firePlace,
    adjustments,
    gla,
    pricePerSqFt,
    condition,
    acres,
    squareFeet,
    proximity,
    address,
    yearBuilt,
    age,
    bedRooms,
    fullBaths,
    halfBaths,
    totalRooms,
  ];

  const setInputFieldValue = (composition, value, index = 0) => {
    // note: responsible for assigning to auto-assign and calculable fields
    inputRef.current[
      Array.isArray(composition) ? composition[index].label : composition.label
    ].value = value;
  };

  const getInputFieldValue = (composition, index = 0) =>
    // note: this is for getting the values in the fields that will be used for computation
    inputRef.current[
      Array.isArray(composition) ? composition[index].label : composition.label
    ].value;

  const getInputField = (composition, index = 0) =>
    // note: getting the FIELD (not value); can be used to change from enabled to disabled, etc.
    inputRef.current[
      Array.isArray(composition) ? composition[index].label : composition.label
    ];

  const addValueToFields = (fieldSelected, valueToAssign) => {
    [
      'subject',
      'listComp1',
      'listComp2',
      'listComp3',
      'saleComp1',
      'saleComp2',
      'saleComp3',
    ].forEach(comp => {
      setInputFieldValue(fieldSelected[comp], valueToAssign);
    });
  };

  const calculateCompTotals = () => {
    ['subject', 'saleComp1', 'saleComp2', 'saleComp3'].forEach(comp => {
      setInputFieldValue(
        compTotals[comp],
        parseInt(getInputFieldValue(salePrice[comp]) || 0, 10) -
          parseInt(getInputFieldValue(adjustments[comp]) || 0, 10)
      );
    });
    ['listComp1', 'listComp2', 'listComp3'].forEach(comp => {
      setInputFieldValue(
        compTotals[comp],
        parseInt(getInputFieldValue(listPrice[comp]) || 0, 10) -
          parseInt(getInputFieldValue(adjustments[comp]) || 0, 10)
      );
    });
  };

  const calculatePriceprSqft = () => {
    ['subject', 'saleComp1', 'saleComp2', 'saleComp3'].forEach(comp => {
      setInputFieldValue(
        pricePerSqFt[comp],
        parseInt(getInputFieldValue(salePrice[comp]) || 0, 10) /
          parseInt(getInputFieldValue(gla[comp], 1) || 0, 10) || 0
      );
    });
    ['listComp1', 'listComp2', 'listComp3'].forEach(comp => {
      setInputFieldValue(
        pricePerSqFt[comp],
        parseInt(getInputFieldValue(listPrice[comp]) || 0, 10) /
          parseInt(getInputFieldValue(gla[comp], 1) || 1, 10) || 0
      );
    });
  };

  const calculateCompDom = () => {
    ['listComp1', 'listComp2', 'listComp3'].forEach(comp => {
      setInputFieldValue(
        dom[comp],
        getInputFieldValue(originalListDate[comp])
          ? Math.abs(
              moment(getInputFieldValue(originalListDate[comp])).diff(
                moment().format('MM/DD/YYYY'),
                'd'
              )
            )
          : ''
      );
    });
    ['saleComp1', 'saleComp2', 'saleComp3'].forEach(comp => {
      setInputFieldValue(
        dom[comp],
        getInputFieldValue(originalListDate[comp]) &&
          getInputFieldValue(saleDate[comp])
          ? Math.abs(
              moment(getInputFieldValue(saleDate[comp])).diff(
                moment(getInputFieldValue(originalListDate[comp])),
                'd'
              )
            )
          : ''
      );
    });
  };

  const calculateSaleCompOriginalListDate = () => {
    ['saleComp1', 'saleComp2', 'saleComp3'].forEach(comp => {
      setInputFieldValue(
        originalListDate[comp],
        getInputFieldValue(dom[comp]) &&
          getInputFieldValue(currentListDate[comp])
          ? moment(getInputFieldValue(currentListDate[comp]))
              .add(getInputFieldValue(dom[comp]), 'd')
              .format('MM/DD/YYYY')
          : ''
      );
    });
  };

  const calculateListCompOriginalListDate = () => {
    ['listComp1', 'listComp2', 'listComp3'].forEach(comp => {
      setInputFieldValue(
        originalListDate[comp],
        getInputFieldValue(dom[comp])
          ? moment()
              .subtract(getInputFieldValue(dom[comp]), 'd')
              .format('MM/DD/YYYY')
          : ''
      );
    });
  };

  const calculateAdjustments = () => {
    [
      'saleComp1',
      'saleComp2',
      'saleComp3',
      'listComp1',
      'listComp2',
      'listComp3',
    ].forEach(comp => {
      let total = 0;
      fieldsVerticalState
        .filter(item => item.category === 'adjustments')
        .forEach(item => {
          total += parseInt(getInputFieldValue(item[comp], 1) || 0, 10);
        });
      setInputFieldValue(adjustments[comp], total);
    });
  };

  const handleAutoAssign = index => {
    // note: automatically assigns other fields in the row with the same value as the first field
    const { subject } = fieldsVerticalState[index];
    const valueToAssign = inputRef.current[subject.label].value;
    addValueToFields(fieldsVerticalState[index], valueToAssign);
    if (fieldsVerticalState[index].name === 'basement') {
      if (valueToAssign === 'FULL') {
        addValueToFields(finished, 'YES');
        addValueToFields(percentFinished, '100');
      } else if (valueToAssign === 'NONE') {
        addValueToFields(finished, 'NO');
        addValueToFields(percentFinished, '0');
      }
    }
  };

  const getPropertyAdjustment = (value, adjustmentType) => {
    const result = adjustmentType.find(item => {
      const priceFrom = parseInt(item.from, 10) || 0;
      const priceTo = parseInt(item.to, 10) || 0;
      return priceFrom >= value || value <= priceTo;
    });
    return result || { value: 0 };
  };

  const findAdjustmentOption = category => {
    return adjustmentOption.filter(item => item.category === category);
  };

  const calculatePropertyAdjustment = () => {
    adjustmentFields.forEach(field => {
      const comparableField = fieldsVerticalState.find(
        item => item.comparableField === field.category
      );

      [
        'saleComp1',
        'saleComp2',
        'saleComp3',
        'listComp1',
        'listComp2',
        'listComp3',
      ].forEach(comp => {
        const sPriceComp = salePrice[comp]
          ? parseInt(getInputFieldValue(salePrice[comp]), 10)
          : 0;

        const saleCompAdjustmentOptions = field.merge
          ? findAdjustmentOption(getInputFieldValue(comparableField[comp]))
          : findAdjustmentOption(field.category);

        const compAdjustment = getPropertyAdjustment(
          sPriceComp,
          saleCompAdjustmentOptions
        ).value;

        if (field.inputType === 'cmb') {
          const fieldValue = getInputFieldValue(comparableField[comp], 0);

          const adjVal =
            field.category === 'Fireplace' && fieldValue === 'NO'
              ? ''
              : compAdjustment;

          setInputFieldValue(comparableField[comp], adjVal, 1);
        } else if (field.inputType === 'text') {
          const subjectField =
            parseInt(getInputFieldValue(comparableField.subject), 10) || 0;

          const fieldComp =
            parseInt(getInputFieldValue(comparableField[comp], 0), 10) || 0;

          setInputFieldValue(
            comparableField[comp],
            (subjectField - fieldComp) * compAdjustment,
            1
          );
        }
      });
    });
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

  const updateListFormalAdjustment = () => {
    [
      'saleComp1',
      'saleComp2',
      'saleComp3',
      'listComp1',
      'listComp2',
      'listComp3',
    ].forEach(comp => {
      const totalStr = fieldsVerticalState
        .filter(item => item.category === 'adjustments')
        .map(item => `${item.label} ${getInputFieldValue(item[comp], 1)}`)
        .join(', ');
      setInputFieldValue(
        { label: `txt${capitalize(comp)}FormatAdjustments` },
        totalStr
      );
    });
  };

  const calculateCondition = () => {
    const { options } = condition.subject;
    const subjectLevel = options.findIndex(
      item => item.value === getInputFieldValue(condition.subject)
    );
    [
      'saleComp1',
      'saleComp2',
      'saleComp3',
      'listComp1',
      'listComp2',
      'listComp3',
    ].forEach(comp => {
      const level = options.findIndex(
        item => item.value === getInputFieldValue(condition[comp])
      );
      const adjustment = getPropertyAdjustment(
        parseInt(getInputFieldValue(salePrice[comp]), 10) || 0,
        findAdjustmentOption('Condition')
      );
      setInputFieldValue(
        condition[comp],
        (subjectLevel - level) * adjustment.value,
        1
      );
    });
  };

  const calculateAcres = () => {
    [
      'subject',
      'listComp1',
      'listComp2',
      'listComp3',
      'saleComp1',
      'saleComp2',
      'saleComp3',
    ].forEach(comp => {
      setInputFieldValue(
        acres[comp],
        parseInt(getInputFieldValue(squareFeet[comp]) * 0.000022957, 10)
      );
    });
  };

  const calculateSquareFeet = () => {
    [
      'subject',
      'listComp1',
      'listComp2',
      'listComp3',
      'saleComp1',
      'saleComp2',
      'saleComp3',
    ].forEach(comp => {
      setInputFieldValue(
        squareFeet[comp],
        parseInt(getInputFieldValue(acres[comp]) * 43560, 10)
      );
    });
  };

  const calculateYearBuilt = () => {
    ['subject'].forEach(comp => {
      setInputFieldValue(
        age[comp],
        parseInt(
          parseInt(moment().format('YYYY'), 10) -
            getInputFieldValue(yearBuilt[comp], 1) || 0,
          10
        )
      );
    });
    [
      'listComp1',
      'listComp2',
      'listComp3',
      'saleComp1',
      'saleComp2',
      'saleComp3',
    ].forEach(comp => {
      setInputFieldValue(
        age[comp],
        parseInt(
          parseInt(moment().format('YYYY'), 10) -
            getInputFieldValue(yearBuilt[comp], 1) || 0,
          10
        )
      );
    });
  };

  const getLatLngByAddress = async iformAddress => {
    const geoCodes = await geocodeByAddress(iformAddress);
    const latlng = await getLatLng(geoCodes[0]);
    return latlng || null;
  };

  const calculateDistance = (mk1, mk2) => {
    if (!mk1 || !mk2) return null;
    const R = 3958.8; // Radius of the Earth in miles
    const rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
    const rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
    const difflat = rlat2 - rlat1; // Radian difference (latitudes)
    const difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)

    const d =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) *
              Math.cos(rlat2) *
              Math.sin(difflon / 2) *
              Math.sin(difflon / 2)
        )
      );
    return d;
  };

  const calculateProximity = () => {
    if (subjectLatLng) {
      [
        'listComp1',
        'listComp2',
        'listComp3',
        'saleComp1',
        'saleComp2',
        'saleComp3',
      ].forEach(async comp => {
        const compAddress = getInputFieldValue(address[comp]);
        let distance = null;
        if (compAddress) {
          const compLatLng = await getLatLngByAddress(compAddress);
          distance = calculateDistance(subjectLatLng, compLatLng);
        }

        if (distance) {
          setInputFieldValue(proximity[comp], parseFloat(distance).toFixed(2));
        }
      });
    }
  };

  const calculateTotalRooms = () => {
    ['subject'].forEach(async comp => {
      setInputFieldValue(
        totalRooms[comp],
        Number(getInputFieldValue(bedRooms[comp], 1)) +
          Number(getInputFieldValue(fullBaths[comp], 1)) +
          Number(getInputFieldValue(halfBaths[comp], 1))
      );
    });
    [
      'listComp1',
      'listComp2',
      'listComp3',
      'saleComp1',
      'saleComp2',
      'saleComp3',
    ].forEach(async comp => {
      setInputFieldValue(
        totalRooms[comp],
        Number(getInputFieldValue(bedRooms[comp], 1)) +
          Number(getInputFieldValue(fullBaths[comp], 1)) +
          Number(getInputFieldValue(halfBaths[comp], 1)),
        1
      );
    });
  };

  const disableAllSubjectTypeFields = () => {
    [
      'subject',
      'listComp1',
      'listComp2',
      'listComp3',
      'saleComp1',
      'saleComp2',
      'saleComp3',
    ].forEach(comp => {
      if (getInputFieldValue(subjectType[comp]) === 'Vacant land') {
        subjectTypeFields.forEach(field => {
          if (Array.isArray(field[comp]))
            getInputField(field[comp], 1).disabled = true;
          getInputField(field[comp]).disabled = true;
        });
      } else {
        subjectTypeFields.forEach(field => {
          if (Array.isArray(field[comp]))
            getInputField(field[comp], 1).disabled = false;
          getInputField(field[comp]).disabled = false;
        });
      }
    });
  };

  const disableSubjectTypeFields = fieldName => {
    [
      'subject',
      'listComp1',
      'listComp2',
      'listComp3',
      'saleComp1',
      'saleComp2',
      'saleComp3',
    ].forEach(comp => {
      if (subjectType[comp].label === fieldName) {
        if (getInputFieldValue(subjectType[comp]) === 'Vacant land') {
          subjectTypeFields.forEach(field => {
            if (field[comp] && field[comp].label !== fieldName) {
              if (Array.isArray(field[comp]))
                getInputField(field[comp], 1).disabled = true;
              getInputField(field[comp]).disabled = true;
            }
          });
        } else {
          subjectTypeFields.forEach(field => {
            if (field[comp] && field[comp].label !== fieldName) {
              if (Array.isArray(field[comp]))
                getInputField(field[comp], 1).disabled = false;
              getInputField(field[comp]).disabled = false;
            }
          });
        }
      }
    });
  };

  const showUnitsField = () => {
    setFieldsVerticalState(
      fieldsVertical.map(item => {
        if (
          getInputFieldValue(subjectType.subject) === 'Multi unit' &&
          item.name === 'units'
        ) {
          return {
            ...item,
            hide: false,
          };
        }
        if (
          (getInputFieldValue(subjectType.subject) === 'Condo' ||
            getInputFieldValue(subjectType.subject) === 'SFA/Townhouse') &&
          item.name === 'unitNo'
        ) {
          return {
            ...item,
            hide: false,
          };
        }
        return item;
      })
    );
  };

  const addOptionsOnStyleDesign = (styleDesignComp, options, value) => {
    const select = getInputField(styleDesignComp);
    select.innerHTML = '';
    options.forEach(item => {
      const option = document.createElement('option');
      option.text = item;
      select.add(option);
    });
    select.value = value || '';
  };

  const changeStyleDesignOptions = fieldName => {
    [
      'subject',
      'listComp1',
      'listComp2',
      'listComp3',
      'saleComp1',
      'saleComp2',
      'saleComp3',
    ].forEach(comp => {
      if (subjectType[comp].label === fieldName) {
        let options = styleDesignOptions.map(item => item.value);
        if (getInputFieldValue(subjectType[comp]) === 'SFD') {
          options = [
            'Ranch',
            'Colonial',
            'Traditional',
            'Contemporary',
            'Bi level',
            'Tri level',
            'Cape cod',
            'Bungalow',
            'Cottage',
            'Cabin',
            'Victorian',
          ];
        } else if (getInputFieldValue(subjectType[comp]) === 'SFA/Townhouse') {
          options = [
            '1 story',
            '2 story',
            '3 story',
            '1 story - mid',
            '2 story - mid',
            '3 story - mid',
            '1 story - end',
            '2 story - end',
            '3 story - end',
          ];
        } else if (getInputFieldValue(subjectType[comp]) === 'Condo') {
          options = [
            'Townhouse',
            'Contemporary',
            'Low rise',
            'Mid rise',
            'High rise',
          ];
        } else if (getInputFieldValue(subjectType[comp]) === 'Multi unit') {
          options = ['Duplex', 'Triplex', 'Quadplex'];
        } else if (getInputFieldValue(subjectType[comp]) === 'Home/Modular') {
          options = ['Single', 'Double Wide'];
        }
        addOptionsOnStyleDesign(styleDesign[comp], options, options[0]);
      }
    });
  };

  const changeAllStyleDesignOptions = () => {
    [
      'subject',
      'listComp1',
      'listComp2',
      'listComp3',
      'saleComp1',
      'saleComp2',
      'saleComp3',
    ].forEach(comp => {
      let options = styleDesignOptions.map(item => item.value);
      if (getInputFieldValue(subjectType[comp]) === 'SFD') {
        options = [
          'Ranch',
          'Colonial',
          'Traditional',
          'Contemporary',
          'Bi level',
          'Tri level',
          'Cape cod',
          'Bungalow',
          'Cottage',
          'Cabin',
          'Victorian',
        ];
      } else if (getInputFieldValue(subjectType[comp]) === 'SFA/Townhouse') {
        options = [
          '1 story',
          '2 story',
          '3 story',
          '1 story - mid',
          '2 story - mid',
          '3 story - mid',
          '1 story - end',
          '2 story - end',
          '3 story - end',
        ];
      } else if (getInputFieldValue(subjectType[comp]) === 'Condo') {
        options = [
          'Townhouse',
          'Contemporary',
          'Low rise',
          'Mid rise',
          'High rise',
        ];
      } else if (getInputFieldValue(subjectType[comp]) === 'Multi unit') {
        options = ['Duplex', 'Triplex', 'Quadplex'];
      } else if (getInputFieldValue(subjectType[comp]) === 'Home/Modular') {
        options = ['Single', 'Double Wide'];
      }
      addOptionsOnStyleDesign(
        styleDesign[comp],
        options,
        iform[
          Array.isArray(styleDesign[comp])
            ? styleDesign[comp][0].label
            : styleDesign[comp].label
        ]
      );
    });
  };

  const initiateFields = () => {
    calculateCompTotals();
    calculatePriceprSqft();
    calculateCompDom();
    calculateSaleCompOriginalListDate();
    calculateListCompOriginalListDate();
    calculatePropertyAdjustment();
    updateListFormalAdjustment();
    calculateAdjustments();
    calculateAcres();
    calculateSquareFeet();
    calculateProximity();
    calculateYearBuilt();
    calculateTotalRooms();
    disableAllSubjectTypeFields();
    showUnitsField();
    changeAllStyleDesignOptions();
  };

  useEffect(() => {
    const getSubjectLatLng = async () => {
      setSubjectLatLng(await getLatLngByAddress(iform.txtSubjectAddress));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    };
    if (!subjectLatLng) getSubjectLatLng();
  }, [subjectLatLng, iform.txtSubjectAddress]);

  useEffect(() => {
    initiateFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClear = e => {
    fieldsVerticalState.forEach(item => {
      // note: this is never used? since SUBJECT is never in the options
      if (e.includes('SUBJECT') && item.subject) {
        const { label, value } = item.subject;
        if (
          label !== 'txtSubjectAddress' &&
          label !== 'txtSubjectCity' &&
          label !== 'txtSubjectZip'
        )
          if (inputRef.current[label]) inputRef.current[label].value = value;
      }
      [
        'saleComp1',
        'saleComp2',
        'saleComp3',
        'listComp1',
        'listComp2',
        'listComp2',
      ].forEach(comp => {
        if (e.includes(comp.toUpperCase()) && item[comp]) {
          if (!Array.isArray(item[comp])) {
            const { label, value } = item[comp];
            // note: main items - finding the field to reset input; value is for retaining default values
            if (inputRef.current[label]) inputRef.current[label].value = value;
          } else {
            item[comp].map(subItem => {
              // note: also clearing fields but for sub items (small fields)
              const { label, value } = subItem;
              if (inputRef.current[label])
                inputRef.current[label].value = value;
              return false;
            });
          }
        }
      });
    });
    fieldsHorizontal.map(item => {
      const { label, value } = item.commentType;
      // note: also clearing fields but for the horizontal fields at the botom
      if (inputRef.current[label]) inputRef.current[label].value = value;
      const {
        label: commentsLabel,
        value: commentsValue,
      } = item.comparableComments;
      inputRef.current[commentsLabel].value = commentsValue;
      const {
        label: adjustmentLabel,
        value: adjustmentValue,
      } = item.formatAdjustments;
      inputRef.current[adjustmentLabel].value = adjustmentValue;
      const {
        label: mlsCommentsLabel,
        value: mlsCommentsValue,
      } = item.mlsComments;
      inputRef.current[mlsCommentsLabel].value = mlsCommentsValue;
      return false;
      // note: until here
    });
    initiateFields();
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
      calculateCompTotals();

    if (isUnderComparable(salePrice, name) || isUnderComparable(gla, name))
      calculatePriceprSqft();

    if (
      isUnderComparable(originalListDate, name) ||
      isUnderComparable(currentListDate, name)
    )
      setTimeout(() => calculateCompDom(), 100);

    if (
      isUnderComparable(dom, name) ||
      isUnderComparable(currentListDate, name)
    )
      setTimeout(() => calculateSaleCompOriginalListDate(), 100);

    if (isUnderComparable(dom, name))
      setTimeout(() => calculateListCompOriginalListDate(), 100);

    if (isUnderComparable(salePrice, name)) calculatePropertyAdjustment();

    if (isUnderComparable(firePlace, name, 0)) calculatePropertyAdjustment();

    if (isUnderComparable(condition, name, 0)) calculateCondition();

    if (isUnderComparable(condition, name, 0)) calculateCondition();
    //
    if (isUnderComparable(squareFeet, name, 0)) calculateAcres();

    if (isUnderComparable(acres, name, 0)) calculateSquareFeet();

    let isAlreadyUnderComparable = false;
    fieldsVerticalState
      .filter(item => item.category === 'adjustments')
      .forEach(item => {
        if (!isAlreadyUnderComparable && isUnderComparable(item, name))
          isAlreadyUnderComparable = true;
      });

    if (isAlreadyUnderComparable) {
      updateListFormalAdjustment();
      calculateAdjustments();
    }
    if (isUnderComparable(address, name)) calculateProximity();
    if (isUnderComparable(yearBuilt, name)) calculateYearBuilt();
    if (
      isUnderComparable(bedRooms, name) ||
      isUnderComparable(fullBaths, name) ||
      isUnderComparable(halfBaths, name)
    )
      calculateTotalRooms();

    if (isUnderComparable(subjectType, name)) {
      disableSubjectTypeFields(name);
      showUnitsField();
      changeStyleDesignOptions(name);
    }
  };

  // note: ff. is for rendering columns, the inputref is used to assign refs
  const renderColumn = comp => (
    <Col sm={3}>
      {comp && (
        <>
          {!Array.isArray(comp) ? (
            <>
              {comp.type === 'txt' && (
                <Form.Control
                  onChange={handleChange}
                  readOnly={comp.readOnly}
                  name={comp.label}
                  defaultValue={iform[comp.label] || comp.value}
                  ref={el => (inputRef.current[comp.label] = el)}
                />
              )}
              {comp.type === 'cmb' && (
                <Form.Control
                  onChange={handleChange}
                  as="select"
                  readOnly={comp.readOnly}
                  name={comp.label}
                  defaultValue={iform[comp.label] || comp.value}
                  ref={el => (inputRef.current[comp.label] = el)}
                >
                  {comp.options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Control>
              )}
              {comp.type === 'date' && (
                <Datetime
                  closeOnSelect
                  onChange={() =>
                    handleChange({
                      target: { name: comp.label },
                    })
                  }
                  timeFormat={false}
                  dateFormat="MM/DD/YYYY"
                  defaultValue={
                    iform[comp.label]
                      ? moment(iform[comp.label]).format('MM/DD/YYYY')
                      : ''
                  }
                  inputProps={{
                    className: 'form-control',
                    placeholder: '',
                    readOnly: comp.readOnly,
                    ref: el => (inputRef.current[comp.label] = el),
                  }}
                />
              )}
            </>
          ) : (
            <Form.Row>
              {comp.map((subItem, subItemKey) => (
                <Col key={subItemKey}>
                  {subItem.type === 'txt' && (
                    <Form.Control
                      onChange={handleChange}
                      readOnly={subItem.readOnly}
                      name={subItem.label}
                      defaultValue={iform[subItem.label] || subItem.value}
                      ref={el => (inputRef.current[subItem.label] = el)}
                    />
                  )}
                  {subItem.type === 'cmb' && (
                    <Form.Control
                      onChange={handleChange}
                      as="select"
                      readOnly={subItem.readOnly}
                      name={subItem.label}
                      defaultValue={iform[subItem.label] || subItem.value}
                      ref={el => (inputRef.current[subItem.label] = el)}
                    >
                      {subItem.options.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Control>
                  )}
                  {subItem.type === 'date' && (
                    <Datetime
                      closeOnSelect
                      onChange={() =>
                        handleChange({
                          target: { name: subItem.label },
                        })
                      }
                      timeFormat={false}
                      dateFormat="MM/DD/YYYY"
                      defaultValue={
                        iform[subItem.label]
                          ? moment(iform[subItem.label]).format('MM/DD/YYYY')
                          : ''
                      }
                      inputProps={{
                        className: 'form-control',
                        placeholder: '',
                        readOnly: subItem.readOnly,
                        name: subItem.label,
                        ref: el => (inputRef.current[subItem.label] = el),
                      }}
                    />
                  )}
                </Col>
              ))}
            </Form.Row>
          )}
        </>
      )}
    </Col>
  );
  // note: end of note

  const renderForm = () => (
    <>
      <Form.Row className="mb-2">
        <Col sm={6}>
          <Form.Row>
            <Col sm={3} />
            <Col sm={3}>
              <b>SUBJECT</b>
            </Col>
            <Col sm={3}>
              <b>SALE COMP1</b>
            </Col>
            <Col sm={3}>
              <b>SALE COMP2</b>
            </Col>
          </Form.Row>
        </Col>
        <Col sm={6}>
          <Form.Row>
            <Col sm={3}>
              <b>SALE COMP3</b>
            </Col>
            <Col sm={3}>
              <b>LIST COMP1</b>
            </Col>
            <Col sm={3}>
              <b>LIST COMP2</b>
            </Col>
            <Col sm={3}>
              <b>LIST COMP3</b>
            </Col>
          </Form.Row>
        </Col>
      </Form.Row>
      {fieldsVerticalState.map((item, index) =>
        item.hide ? null : (
          <Form.Row className="mb-2" key={index}>
            <Col sm={6}>
              <Form.Row>
                <Col sm={3}>
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
                {['subject', 'saleComp1', 'saleComp2'].map(comp =>
                  renderColumn(item[comp])
                )}
              </Form.Row>
            </Col>
            <Col sm={6}>
              <Form.Row>
                {[
                  'saleComp3',
                  'listComp1',
                  'listComp2',
                  'listComp3',
                ].map(comp => renderColumn(item[comp]))}
              </Form.Row>
            </Col>
          </Form.Row>
        )
      )}
      <div className="mt-4">
        {// note: this is for assigning refs too
        fieldsHorizontal.map((item, index) => (
          <Form.Row key={index} className="mb-2">
            <Col sm={1}>
              <div className="my-1">{item.label}</div>
            </Col>
            <Col sm={2}>
              <Form.Control
                as="select"
                defaultValue={iform[item.commentType.label] || ''}
                ref={el => (inputRef.current[item.commentType.label] = el)}
              >
                {item.commentType.options.map(option => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Control>
            </Col>
            <Col sm={3}>
              <Form.Control
                as="textarea"
                rows="4"
                defaultValue={iform[item.comparableComments.label] || ''}
                ref={el =>
                  (inputRef.current[item.comparableComments.label] = el)
                }
                placeholder={item.comparableComments.placeholder}
              />
            </Col>
            <Col sm={3}>
              <Form.Control
                as="textarea"
                rows="4"
                defaultValue={iform[item.formatAdjustments.label] || ''}
                ref={el =>
                  (inputRef.current[item.formatAdjustments.label] = el)
                }
                placeholder={item.formatAdjustments.placeholder}
              />
            </Col>
            <Col sm={3}>
              <Form.Control
                as="textarea"
                rows="4"
                defaultValue={iform[item.mlsComments.label] || ''}
                ref={el => (inputRef.current[item.mlsComments.label] = el)}
                placeholder={item.mlsComments.placeholder}
              />
            </Col>
          </Form.Row>
        )) // note: note until here
        }
      </div>
    </>
  );

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
        <Form.Row>
          <Col>{renderForm()}</Col>
          <Neighborhood inputRef={inputRef} iform={iform} />
        </Form.Row>
      </Form>
    </div>
  );
  // note: neighborhood inputref assignment is for the tab at the right
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
