import styleDesignOptions from 'constants/styleDesignOptions';
import subjectTypeOptions from 'constants/subjectTypeOptions';
import saleTypeOptions from 'constants/saleTypeOptions';
import exteriorFinishOptions from 'constants/exteriorFinishOptions';
import conditionOptions from 'constants/conditionOptions';
import viewOptions from 'constants/viewOptions';
import garageOptions from 'constants/garageOptions';
import poolOptions from 'constants/poolOptions';
import outdoorOptions from 'constants/outdoorOptions';
import fireplaceOptions from 'constants/fireplaceOptions';
import basementOptions from 'constants/basementOptions';
import percentOptions from 'constants/percentOptions';
import financingOptions from 'constants/financingOptions';

export default [
  {
    label: 'Address',
    name: 'address',
    subject: {
      type: 'txt',
      label: 'txtSubjectAddress',
      value: '',
      readOnly: true,
    },
    saleComp1: { type: 'txt', label: 'txtSaleComp1Address', value: '' },
    saleComp2: { type: 'txt', label: 'txtSaleComp2Address', value: '' },
    saleComp3: { type: 'txt', label: 'txtSaleComp3Address', value: '' },
    listComp1: { type: 'txt', label: 'txtListComp1Address', value: '' },
    listComp2: { type: 'txt', label: 'txtListComp2Address', value: '' },
    listComp3: { type: 'txt', label: 'txtListComp3Address', value: '' },
  },
  {
    label: 'City',
    name: 'city',
    subject: {
      type: 'txt',
      label: 'txtSubjectCity',
      value: '',
      readOnly: true,
    },
    saleComp1: { type: 'txt', label: 'txtSaleComp1City', value: '' },
    saleComp2: { type: 'txt', label: 'txtSaleComp2City', value: '' },
    saleComp3: { type: 'txt', label: 'txtSaleComp3City', value: '' },
    listComp1: { type: 'txt', label: 'txtListComp1City', value: '' },
    listComp2: { type: 'txt', label: 'txtListComp2City', value: '' },
    listComp3: { type: 'txt', label: 'txtListComp3City', value: '' },
  },
  {
    label: 'Units',
    name: 'units',
    hide: true,
    subject: {
      type: 'txt',
      label: 'txtSubjectUnits',
      value: '',
    },
    saleComp1: { type: 'txt', label: 'txtSaleComp1Units', value: '' },
    saleComp2: { type: 'txt', label: 'txtSaleComp2Units', value: '' },
    saleComp3: { type: 'txt', label: 'txtSaleComp3Units', value: '' },
    listComp1: { type: 'txt', label: 'txtListComp1Units', value: '' },
    listComp2: { type: 'txt', label: 'txtListComp2Units', value: '' },
    listComp3: { type: 'txt', label: 'txtListComp3Units', value: '' },
  },
  {
    label: 'Unit Number',
    name: 'unitNo',
    hide: true,
    subject: [
      {
        type: 'txt',
        label: '',
        value: '#',
        readOnly: true,
      },
      {
        type: 'txt',
        label: 'txtSubjectUnitNo',
        value: '',
      },
    ],
    saleComp1: [
      {
        type: 'txt',
        label: '',
        value: '#',
        readOnly: true,
      },
      { type: 'txt', label: 'txtSaleComp1UnitNo', value: '' },
    ],
    saleComp2: [
      {
        type: 'txt',
        label: '',
        value: '#',
        readOnly: true,
      },
      { type: 'txt', label: 'txtSaleComp2UnitNo', value: '' },
    ],
    saleComp3: [
      {
        type: 'txt',
        label: '',
        value: '#',
        readOnly: true,
      },
      { type: 'txt', label: 'txtSaleComp3UnitNo', value: '' },
    ],
    listComp1: [
      {
        type: 'txt',
        label: '',
        value: '#',
        readOnly: true,
      },
      { type: 'txt', label: 'txtListComp1UnitNo', value: '' },
    ],
    listComp2: [
      {
        type: 'txt',
        label: '',
        value: '#',
        readOnly: true,
      },
      { type: 'txt', label: 'txtListComp2UnitNo', value: '' },
    ],
    listComp3: [
      {
        type: 'txt',
        label: '',
        value: '#',
        readOnly: true,
      },
      { type: 'txt', label: 'txtListComp3UnitNo', value: '' },
    ],
  },
  {
    label: 'Zip',
    name: 'zip',
    subject: { type: 'txt', label: 'txtSubjectZip', value: '', readOnly: true },
    saleComp1: { type: 'txt', label: 'txtSaleComp1Zip', value: '' },
    saleComp2: { type: 'txt', label: 'txtSaleComp2Zip', value: '' },
    saleComp3: { type: 'txt', label: 'txtSaleComp3Zip', value: '' },
    listComp1: { type: 'txt', label: 'txtListComp1Zip', value: '' },
    listComp2: { type: 'txt', label: 'txtListComp2Zip', value: '' },
    listComp3: { type: 'txt', label: 'txtListComp3Zip', value: '' },
  },
  {
    label: 'Proximity',
    name: 'proximity',
    subject: { type: 'txt', label: 'txtSubjectProximity', value: '' },
    saleComp1: { type: 'txt', label: 'txtSaleComp1Proximity', value: '' },
    saleComp2: { type: 'txt', label: 'txtSaleComp2Proximity', value: '' },
    saleComp3: { type: 'txt', label: 'txtSaleComp3Proximity', value: '' },
    listComp1: { type: 'txt', label: 'txtListComp1Proximity', value: '' },
    listComp2: { type: 'txt', label: 'txtListComp2Proximity', value: '' },
    listComp3: { type: 'txt', label: 'txtListComp3Proximity', value: '' },
  },
  {
    label: 'Data Source',
    name: 'dataSource',
    subject: { type: 'txt', label: 'txtSubjectDataSource', value: '' },
    saleComp1: { type: 'txt', label: 'txtSaleComp1DataSource', value: '' },
    saleComp2: { type: 'txt', label: 'txtSaleComp2DataSource', value: '' },
    saleComp3: { type: 'txt', label: 'txtSaleComp3DataSource', value: '' },
    listComp1: { type: 'txt', label: 'txtListComp1DataSource', value: '' },
    listComp2: { type: 'txt', label: 'txtListComp2DataSource', value: '' },
    listComp3: { type: 'txt', label: 'txtListComp3DataSource', value: '' },
  },
  {
    label: 'Tax ID/MLS Number',
    name: 'mlsNumber',
    subject: { type: 'txt', label: 'txtSubjectMLSNumber', value: '' },
    saleComp1: { type: 'txt', label: 'txtSaleComp1MLSNumber', value: '' },
    saleComp2: { type: 'txt', label: 'txtSaleComp2MLSNumber', value: '' },
    saleComp3: { type: 'txt', label: 'txtSaleComp3MLSNumber', value: '' },
    listComp1: { type: 'txt', label: 'txtListComp1MLSNumber', value: '' },
    listComp2: { type: 'txt', label: 'txtListComp2MLSNumber', value: '' },
    listComp3: { type: 'txt', label: 'txtListComp3MLSNumber', value: '' },
  },
  {
    label: 'Sale Type',
    canAutoAssign: true,
    name: 'saleType',
    subject: {
      type: 'cmb',
      label: 'cmbSubjectSaleType',
      value: saleTypeOptions[0].value,
      options: saleTypeOptions,
    },
    saleComp1: {
      type: 'cmb',
      label: 'cmbSaleComp1SaleType',
      value: saleTypeOptions[0].value,
      options: saleTypeOptions,
    },
    saleComp2: {
      type: 'cmb',
      label: 'cmbSaleComp2SaleType',
      value: saleTypeOptions[0].value,
      options: saleTypeOptions,
    },
    saleComp3: {
      type: 'cmb',
      label: 'cmbSaleComp3SaleType',
      value: saleTypeOptions[0].value,
      options: saleTypeOptions,
    },
    listComp1: {
      type: 'cmb',
      label: 'cmbListComp1SaleType',
      value: saleTypeOptions[0].value,
      options: saleTypeOptions,
    },
    listComp2: {
      type: 'cmb',
      label: 'cmbListComp2SaleType',
      value: saleTypeOptions[0].value,
      options: saleTypeOptions,
    },
    listComp3: {
      type: 'cmb',
      label: 'cmbListComp3SaleType',
      value: saleTypeOptions[0].value,
      options: saleTypeOptions,
    },
  },
  {
    label: 'Subject Type',
    canAutoAssign: true,
    name: 'subjectType',
    subject: {
      type: 'cmb',
      label: 'cmbSubjectType',
      value: subjectTypeOptions[0].value,
      options: subjectTypeOptions,
    },
    saleComp1: {
      type: 'cmb',
      label: 'cmbSaleComp1Type',
      value: subjectTypeOptions[0].value,
      options: subjectTypeOptions,
    },
    saleComp2: {
      type: 'cmb',
      label: 'cmbSaleComp2Type',
      value: subjectTypeOptions[0].value,
      options: subjectTypeOptions,
    },
    saleComp3: {
      type: 'cmb',
      label: 'cmbSaleComp3Type',
      value: subjectTypeOptions[0].value,
      options: subjectTypeOptions,
    },
    listComp1: {
      type: 'cmb',
      label: 'cmbListComp1Type',
      value: subjectTypeOptions[0].value,
      options: subjectTypeOptions,
    },
    listComp2: {
      type: 'cmb',
      label: 'cmbListComp2Type',
      value: subjectTypeOptions[0].value,
      options: subjectTypeOptions,
    },
    listComp3: {
      type: 'cmb',
      label: 'cmbListComp3Type',
      value: subjectTypeOptions[0].value,
      options: subjectTypeOptions,
    },
  },
  {
    label: 'Style Design',
    name: 'styleDesign',
    canAutoAssign: true,
    category: 'adjustments',
    subject: {
      type: 'cmb',
      label: 'cmbSubjectStyle',
      value: styleDesignOptions[0].value,
      options: styleDesignOptions,
    },
    saleComp1: [
      {
        type: 'cmb',
        label: 'cmbSaleComp1Style',
        value: styleDesignOptions[0].value,
        options: styleDesignOptions,
      },
      { type: 'txt', label: 'txtSaleComp1StyleAdjBuiltIn', value: '0' },
    ],
    saleComp2: [
      {
        type: 'cmb',
        label: 'cmbSaleComp2Style',
        value: styleDesignOptions[0].value,
        options: styleDesignOptions,
      },
      { type: 'txt', label: 'txtSaleComp2StyleAdjBuiltIn', value: '0' },
    ],
    saleComp3: [
      {
        type: 'cmb',
        label: 'cmbSaleComp3Style',
        value: styleDesignOptions[0].value,
        options: styleDesignOptions,
      },
      { type: 'txt', label: 'txtSaleComp3StyleAdjBuiltIn', value: '0' },
    ],
    listComp1: [
      {
        type: 'cmb',
        label: 'cmbListComp1Style',
        value: styleDesignOptions[0].value,
        options: styleDesignOptions,
      },
      { type: 'txt', label: 'txtListComp1StyleAdjBuiltIn', value: '0' },
    ],
    listComp2: [
      {
        type: 'cmb',
        label: 'cmbListComp2Style',
        value: styleDesignOptions[0].value,
        options: styleDesignOptions,
      },
      { type: 'txt', label: 'txtListComp2StyleAdjBuiltIn', value: '0' },
    ],
    listComp3: [
      {
        type: 'cmb',
        label: 'cmbListComp3Style',
        value: styleDesignOptions[0].value,
        options: styleDesignOptions,
      },
      { type: 'txt', label: 'txtListComp3StyleAdjBuiltIn', value: '0' },
    ],
  },
  {
    label: 'Exterior Finish',
    comparableField: 'Exterior Finish',
    name: 'exteriorFinish',
    canAutoAssign: true,
    category: 'adjustments',
    subject: {
      type: 'cmb',
      label: 'cmbSubjectExtFinish',
      value: exteriorFinishOptions[0].value,
      options: exteriorFinishOptions,
    },
    saleComp1: [
      {
        type: 'cmb',
        label: 'cmbSaleComp1ExtFinish',
        value: exteriorFinishOptions[0].value,
        options: exteriorFinishOptions,
      },
      { type: 'txt', label: 'txtSaleComp1ExtFinishAdjBuiltIn', value: '0' },
    ],
    saleComp2: [
      {
        type: 'cmb',
        label: 'cmbSaleComp2ExtFinish',
        value: exteriorFinishOptions[0].value,
        options: exteriorFinishOptions,
      },
      { type: 'txt', label: 'txtSaleComp2ExtFinishAdjBuiltIn', value: '0' },
    ],
    saleComp3: [
      {
        type: 'cmb',
        label: 'cmbSaleComp3ExtFinish',
        value: exteriorFinishOptions[0].value,
        options: exteriorFinishOptions,
      },
      { type: 'txt', label: 'txtSaleComp3ExtFinishAdjBuiltIn', value: '0' },
    ],
    listComp1: [
      {
        type: 'cmb',
        label: 'cmbListComp1ExtFinish',
        value: exteriorFinishOptions[0].value,
        options: exteriorFinishOptions,
      },
      { type: 'txt', label: 'txtListComp1ExtFinishAdjBuiltIn', value: '0' },
    ],
    listComp2: [
      {
        type: 'cmb',
        label: 'cmbListComp2ExtFinish',
        value: exteriorFinishOptions[0].value,
        options: exteriorFinishOptions,
      },
      { type: 'txt', label: 'txtListComp2ExtFinishAdjBuiltIn', value: '0' },
    ],
    listComp3: [
      {
        type: 'cmb',
        label: 'cmbListComp3ExtFinish',
        value: exteriorFinishOptions[0].value,
        options: exteriorFinishOptions,
      },
      { type: 'txt', label: 'txtListComp3ExtFinishAdjBuiltIn', value: '0' },
    ],
  },
  {
    label: 'Condition',
    comparableField: 'Condition',
    name: 'condition',
    canAutoAssign: true,
    category: 'adjustments',
    subject: {
      type: 'cmb',
      label: 'cmbSubjectCondition',
      value: conditionOptions[0].value,
      options: conditionOptions,
    },
    saleComp1: [
      {
        type: 'cmb',
        label: 'cmbSaleComp1Condition',
        value: conditionOptions[0].value,
        options: conditionOptions,
      },
      { type: 'txt', label: 'txtSaleComp1ConditionAdjBuiltIn', value: '0' },
    ],
    saleComp2: [
      {
        type: 'cmb',
        label: 'cmbSaleComp2Condition',
        value: conditionOptions[0].value,
        options: conditionOptions,
      },
      { type: 'txt', label: 'txtSaleComp2ConditionAdjBuiltIn', value: '0' },
    ],
    saleComp3: [
      {
        type: 'cmb',
        label: 'cmbSaleComp3Condition',
        value: conditionOptions[0].value,
        options: conditionOptions,
      },
      { type: 'txt', label: 'txtSaleComp3ConditionAdjBuiltIn', value: '0' },
    ],
    listComp1: [
      {
        type: 'cmb',
        label: 'cmbListComp1Condition',
        value: conditionOptions[0].value,
        options: conditionOptions,
      },
      { type: 'txt', label: 'txtListComp1ConditionAdjBuiltIn', value: '0' },
    ],
    listComp2: [
      {
        type: 'cmb',
        label: 'cmbListComp2Condition',
        value: conditionOptions[0].value,
        options: conditionOptions,
      },
      { type: 'txt', label: 'txtListComp2ConditionAdjBuiltIn', value: '0' },
    ],
    listComp3: [
      {
        type: 'cmb',
        label: 'cmbListComp3Condition',
        value: conditionOptions[0].value,
        options: conditionOptions,
      },
      { type: 'txt', label: 'txtListComp3ConditionAdjBuiltIn', value: '0' },
    ],
  },
  {
    label: 'Quality',
    comparableField: 'Quality',
    name: 'quality',
    canAutoAssign: true,
    category: 'adjustments',
    subject: {
      type: 'cmb',
      label: 'cmbSubjectQuality',
      value: conditionOptions[0].value,
      options: conditionOptions,
    },
    saleComp1: [
      {
        type: 'cmb',
        label: 'cmbSaleComp1Quality',
        value: conditionOptions[0].value,
        options: conditionOptions,
      },
      { type: 'txt', label: 'txtSaleComp1QualityAdjBuiltIn', value: '0' },
    ],
    saleComp2: [
      {
        type: 'cmb',
        label: 'cmbSaleComp2Quality',
        value: conditionOptions[0].value,
        options: conditionOptions,
      },
      { type: 'txt', label: 'txtSaleComp2QualityAdjBuiltIn', value: '0' },
    ],
    saleComp3: [
      {
        type: 'cmb',
        label: 'cmbSaleComp3Quality',
        value: conditionOptions[0].value,
        options: conditionOptions,
      },
      { type: 'txt', label: 'txtSaleComp3QualityAdjBuiltIn', value: '0' },
    ],
    listComp1: [
      {
        type: 'cmb',
        label: 'cmbListComp1Quality',
        value: conditionOptions[0].value,
        options: conditionOptions,
      },
      { type: 'txt', label: 'txtListComp1QualityAdjBuiltIn', value: '0' },
    ],
    listComp2: [
      {
        type: 'cmb',
        label: 'cmbListComp2Quality',
        value: conditionOptions[0].value,
        options: conditionOptions,
      },
      { type: 'txt', label: 'txtListComp2QualityAdjBuiltIn', value: '0' },
    ],
    listComp3: [
      {
        type: 'cmb',
        label: 'cmbListComp3Quality',
        value: conditionOptions[0].value,
        options: conditionOptions,
      },
      { type: 'txt', label: 'txtListComp3QualityAdjBuiltIn', value: '0' },
    ],
  },
  {
    label: 'View',
    comparableField: 'View',
    name: 'view',
    canAutoAssign: true,
    category: 'adjustments',
    subject: {
      type: 'cmb',
      label: 'cmbSubjectView',
      value: viewOptions[0].value,
      options: viewOptions,
    },
    saleComp1: [
      {
        type: 'cmb',
        label: 'cmbSaleComp1View',
        value: viewOptions[0].value,
        options: viewOptions,
      },
      { type: 'txt', label: 'txtSaleComp1ViewAdjBuiltIn', value: '0' },
    ],
    saleComp2: [
      {
        type: 'cmb',
        label: 'cmbSaleComp2View',
        value: viewOptions[0].value,
        options: viewOptions,
      },
      { type: 'txt', label: 'txtSaleComp2ViewAdjBuiltIn', value: '0' },
    ],
    saleComp3: [
      {
        type: 'cmb',
        label: 'cmbSaleComp3View',
        value: viewOptions[0].value,
        options: viewOptions,
      },
      { type: 'txt', label: 'txtSaleComp3ViewAdjBuiltIn', value: '0' },
    ],
    listComp1: [
      {
        type: 'cmb',
        label: 'cmbListComp1View',
        value: viewOptions[0].value,
        options: viewOptions,
      },
      { type: 'txt', label: 'txtListComp1ViewAdjBuiltIn', value: '0' },
    ],
    listComp2: [
      {
        type: 'cmb',
        label: 'cmbListComp2View',
        value: viewOptions[0].value,
        options: viewOptions,
      },
      { type: 'txt', label: 'txtListComp2ViewAdjBuiltIn', value: '0' },
    ],
    listComp3: [
      {
        type: 'cmb',
        label: 'cmbListComp3View',
        value: viewOptions[0].value,
        options: viewOptions,
      },
      { type: 'txt', label: 'txtListComp3ViewAdjBuiltIn', value: '0' },
    ],
  },
  {
    label: 'Subdivision',
    name: 'subdivisions',
    subject: { type: 'txt', label: 'txtSubjectSubdivision', value: '' },
    saleComp1: { type: 'txt', label: 'txtSaleComp1Subdivision', value: '' },
    saleComp2: { type: 'txt', label: 'txtSaleComp2Subdivision', value: '' },
    saleComp3: { type: 'txt', label: 'txtSaleComp3Subdivision', value: '' },
    listComp1: { type: 'txt', label: 'txtListComp1Subdivision', value: '' },
    listComp2: { type: 'txt', label: 'txtListComp2Subdivision', value: '' },
    listComp3: { type: 'txt', label: 'txtListComp3Subdivision', value: '' },
  },
  {
    label: 'HOA Fee',
    name: 'hoaFee',
    subject: { type: 'txt', label: 'txtSubjectHOAFee', value: '' },
    saleComp1: { type: 'txt', label: 'txtSaleComp1HOAFee', value: '' },
    saleComp2: { type: 'txt', label: 'txtSaleComp2HOAFee', value: '' },
    saleComp3: { type: 'txt', label: 'txtSaleComp3HOAFee', value: '' },
    listComp1: { type: 'txt', label: 'txtListComp1HOAFee', value: '' },
    listComp2: { type: 'txt', label: 'txtListComp2HOAFee', value: '' },
    listComp3: { type: 'txt', label: 'txtListComp3HOAFee', value: '' },
  },
  {
    label: 'Total Rooms',
    category: 'adjustments',
    name: 'totalRooms',
    subject: { type: 'txt', label: 'txtSubjectTotalRooms', value: '' },
    saleComp1: [
      { type: 'txt', label: 'txtSaleComp1TotalRooms', value: '' },
      { type: 'txt', label: 'txtSaleComp1TotalRoomsAdjBuiltIn', value: '0' },
    ],
    saleComp2: [
      { type: 'txt', label: 'txtSaleComp2TotalRooms', value: '' },
      { type: 'txt', label: 'txtSaleComp2TotalRoomsAdjBuiltIn', value: '0' },
    ],
    saleComp3: [
      { type: 'txt', label: 'txtSaleComp3TotalRooms', value: '' },
      { type: 'txt', label: 'txtSaleComp3TotalRoomsAdjBuiltIn', value: '0' },
    ],
    listComp1: [
      { type: 'txt', label: 'txtListComp1TotalRooms', value: '' },
      { type: 'txt', label: 'txtListComp1TotalRoomsAdjBuiltIn', value: '0' },
    ],
    listComp2: [
      { type: 'txt', label: 'txtListComp2TotalRooms', value: '' },
      { type: 'txt', label: 'txtListComp2TotalRoomsAdjBuiltIn', value: '0' },
    ],
    listComp3: [
      { type: 'txt', label: 'txtListComp3TotalRooms', value: '' },
      { type: 'txt', label: 'txtListComp3TotalRoomsAdjBuiltIn', value: '0' },
    ],
  },
  {
    label: 'Bedrooms',
    comparableField: 'Bedrooms',
    name: 'bedRooms',
    category: 'adjustments',
    canAutoAssign: true,
    subject: { type: 'txt', label: 'txtSubjectBedrooms', value: '' },
    saleComp1: [
      { type: 'txt', label: 'txtSaleComp1Bedrooms', value: '' },
      { type: 'txt', label: 'txtSaleComp1BedroomsAdjBuiltIn', value: '0' },
    ],
    saleComp2: [
      { type: 'txt', label: 'txtSaleComp2Bedrooms', value: '' },
      { type: 'txt', label: 'txtSaleComp2BedroomsAdjBuiltIn', value: '0' },
    ],
    saleComp3: [
      { type: 'txt', label: 'txtSaleComp3Bedrooms', value: '' },
      { type: 'txt', label: 'txtSaleComp3BedroomsAdjBuiltIn', value: '0' },
    ],
    listComp1: [
      { type: 'txt', label: 'txtListComp1Bedrooms', value: '' },
      { type: 'txt', label: 'txtListComp1BedroomsAdjBuiltIn', value: '0' },
    ],
    listComp2: [
      { type: 'txt', label: 'txtListComp2Bedrooms', value: '' },
      { type: 'txt', label: 'txtListComp2BedroomsAdjBuiltIn', value: '0' },
    ],
    listComp3: [
      { type: 'txt', label: 'txtListComp3Bedrooms', value: '' },
      { type: 'txt', label: 'txtListComp3BedroomsAdjBuiltIn', value: '0' },
    ],
  },
  {
    label: 'Full Baths',
    comparableField: 'Full Baths',
    category: 'adjustments',
    canAutoAssign: true,
    name: 'fullBaths',
    subject: { type: 'txt', label: 'txtSubjectFullBaths', value: '' },
    saleComp1: [
      { type: 'txt', label: 'txtSaleComp1FullBaths', value: '' },
      { type: 'txt', label: 'txtSaleComp1FullBathsAdjBuiltIn', value: '0' },
    ],
    saleComp2: [
      { type: 'txt', label: 'txtSaleComp2FullBaths', value: '' },
      { type: 'txt', label: 'txtSaleComp2FullBathsAdjBuiltIn', value: '0' },
    ],
    saleComp3: [
      { type: 'txt', label: 'txtSaleComp3FullBaths', value: '' },
      { type: 'txt', label: 'txtSaleComp3FullBathsAdjBuiltIn', value: '0' },
    ],
    listComp1: [
      { type: 'txt', label: 'txtListComp1FullBaths', value: '' },
      { type: 'txt', label: 'txtListComp1FullBathsAdjBuiltIn', value: '0' },
    ],
    listComp2: [
      { type: 'txt', label: 'txtListComp2FullBaths', value: '' },
      { type: 'txt', label: 'txtListComp2FullBathsAdjBuiltIn', value: '0' },
    ],
    listComp3: [
      { type: 'txt', label: 'txtListComp3FullBaths', value: '' },
      { type: 'txt', label: 'txtListComp3FullBathsAdjBuiltIn', value: '0' },
    ],
  },
  {
    label: 'Half Baths',
    comparableField: 'Half Baths',
    category: 'adjustments',
    canAutoAssign: true,
    name: 'halfBaths',
    subject: { type: 'txt', label: 'txtSubjectHalfBaths', value: '' },
    saleComp1: [
      { type: 'txt', label: 'txtSaleComp1HalfBaths', value: '' },
      { type: 'txt', label: 'txtSaleComp1HalfBathsAdjBuiltIn', value: '0' },
    ],
    saleComp2: [
      { type: 'txt', label: 'txtSaleComp2HalfBaths', value: '' },
      { type: 'txt', label: 'txtSaleComp2HalfBathsAdjBuiltIn', value: '0' },
    ],
    saleComp3: [
      { type: 'txt', label: 'txtSaleComp3HalfBaths', value: '' },
      { type: 'txt', label: 'txtSaleComp3HalfBathsAdjBuiltIn', value: '0' },
    ],
    listComp1: [
      { type: 'txt', label: 'txtListComp1HalfBaths', value: '' },
      { type: 'txt', label: 'txtListComp1HalfBathsAdjBuiltIn', value: '0' },
    ],
    listComp2: [
      { type: 'txt', label: 'txtListComp2HalfBaths', value: '' },
      { type: 'txt', label: 'txtListComp2HalfBathsAdjBuiltIn', value: '0' },
    ],
    listComp3: [
      { type: 'txt', label: 'txtListComp3HalfBaths', value: '' },
      { type: 'txt', label: 'txtListComp3HalfBathsAdjBuiltIn', value: '0' },
    ],
  },
  {
    label: 'GLA',
    comparableField: 'GLA',
    name: 'gla',
    category: 'adjustments',
    canAutoAssign: true,
    subject: { type: 'txt', label: 'txtSubjectGLA', value: '' },
    saleComp1: [
      { type: 'txt', label: 'txtSaleComp1GLA', value: '' },
      { type: 'txt', label: 'txtSaleComp1GLAAdjBuiltIn', value: '0' },
    ],
    saleComp2: [
      { type: 'txt', label: 'txtSaleComp2GLA', value: '' },
      { type: 'txt', label: 'txtSaleComp2GLAAdjBuiltIn', value: '0' },
    ],
    saleComp3: [
      { type: 'txt', label: 'txtSaleComp3GLA', value: '' },
      { type: 'txt', label: 'txtSaleComp3GLAAdjBuiltIn', value: '0' },
    ],
    listComp1: [
      { type: 'txt', label: 'txtListComp1GLA', value: '' },
      { type: 'txt', label: 'txtListComp1GLAAdjBuiltIn', value: '0' },
    ],
    listComp2: [
      { type: 'txt', label: 'txtListComp2GLA', value: '' },
      { type: 'txt', label: 'txtListComp2GLAAdjBuiltIn', value: '0' },
    ],
    listComp3: [
      { type: 'txt', label: 'txtListComp3GLA', value: '' },
      { type: 'txt', label: 'txtListComp3GLAAdjBuiltIn', value: '0' },
    ],
  },
  {
    label: 'Year Built',
    comparableField: 'Year Built',
    name: 'yearBuilt',
    category: 'adjustments',
    canAutoAssign: true,
    subject: { type: 'txt', label: 'txtSubjectYearBuilt', value: '' },
    saleComp1: [
      { type: 'txt', label: 'txtSaleComp1YearBuilt', value: '' },
      { type: 'txt', label: 'txtSaleComp1YearBuiltAdjBuiltIn', value: '0' },
    ],
    saleComp2: [
      { type: 'txt', label: 'txtSaleComp2YearBuilt', value: '' },
      { type: 'txt', label: 'txtSaleComp2YearBuiltAdjBuiltIn', value: '0' },
    ],
    saleComp3: [
      { type: 'txt', label: 'txtSaleComp3YearBuilt', value: '' },
      { type: 'txt', label: 'txtSaleComp3YearBuiltAdjBuiltIn', value: '0' },
    ],
    listComp1: [
      { type: 'txt', label: 'txtListComp1YearBuilt', value: '' },
      { type: 'txt', label: 'txtListComp1YearBuiltAdjBuiltIn', value: '0' },
    ],
    listComp2: [
      { type: 'txt', label: 'txtListComp2YearBuilt', value: '' },
      { type: 'txt', label: 'txtListComp2YearBuiltAdjBuiltIn', value: '0' },
    ],
    listComp3: [
      { type: 'txt', label: 'txtListComp3YearBuilt', value: '' },
      { type: 'txt', label: 'txtListComp3YearBuiltAdjBuiltIn', value: '0' },
    ],
  },
  {
    label: 'Age',
    name: 'age',
    subject: { type: 'txt', label: 'txtSubjectAge', value: '' },
    saleComp1: { type: 'txt', label: 'txtSaleComp1Age', value: '' },
    saleComp2: { type: 'txt', label: 'txtSaleComp2Age', value: '' },
    saleComp3: { type: 'txt', label: 'txtSaleComp3Age', value: '' },
    listComp1: { type: 'txt', label: 'txtListComp1Age', value: '' },
    listComp2: { type: 'txt', label: 'txtListComp2Age', value: '' },
    listComp3: { type: 'txt', label: 'txtListComp3Age', value: '' },
  },
  {
    label: 'Acres',
    comparableField: 'Acres/Square Feet',
    name: 'acres',
    category: 'adjustments',
    canAutoAssign: true,
    subject: { type: 'txt', label: 'txtSubjectAcres', value: '' },
    saleComp1: [
      { type: 'txt', label: 'txtSaleComp1Acres', value: '' },
      { type: 'txt', label: 'txtSaleComp1AcresAdjBuiltIn', value: '0' },
    ],
    saleComp2: [
      { type: 'txt', label: 'txtSaleComp2Acres', value: '' },
      { type: 'txt', label: 'txtSaleComp2AcresAdjBuiltIn', value: '0' },
    ],
    saleComp3: [
      { type: 'txt', label: 'txtSaleComp3Acres', value: '' },
      { type: 'txt', label: 'txtSaleComp3AcresAdjBuiltIn', value: '0' },
    ],
    listComp1: [
      { type: 'txt', label: 'txtListComp1Acres', value: '' },
      { type: 'txt', label: 'txtListComp1AcresAdjBuiltIn', value: '0' },
    ],
    listComp2: [
      { type: 'txt', label: 'txtListComp2Acres', value: '' },
      { type: 'txt', label: 'txtListComp2AcresAdjBuiltIn', value: '0' },
    ],
    listComp3: [
      { type: 'txt', label: 'txtListComp3Acres', value: '' },
      { type: 'txt', label: 'txtListComp3AcresAdjBuiltIn', value: '0' },
    ],
  },
  {
    label: 'Square Feet',
    subject: { type: 'txt', label: 'txtSubjectSquareFeet', value: '' },
    name: 'squareFeet',
    saleComp1: { type: 'txt', label: 'txtSaleComp1SquareFeet', value: '' },
    saleComp2: { type: 'txt', label: 'txtSaleComp2SquareFeet', value: '' },
    saleComp3: { type: 'txt', label: 'txtSaleComp3SquareFeet', value: '' },
    listComp1: { type: 'txt', label: 'txtListComp1SquareFeet', value: '' },
    listComp2: { type: 'txt', label: 'txtListComp2SquareFeet', value: '' },
    listComp3: { type: 'txt', label: 'txtListComp3SquareFeet', value: '' },
  },
  {
    label: 'Garage',
    name: 'garage',
    comparableField: 'Garage',
    category: 'adjustments',
    canAutoAssign: true,
    subject: {
      type: 'cmb',
      label: 'cmbSubjectGarage',
      value: garageOptions[0].value,
      options: garageOptions,
    },
    saleComp1: [
      {
        type: 'cmb',
        label: 'cmbSaleComp1Garage',
        value: garageOptions[0].value,
        options: garageOptions,
      },
      { type: 'txt', label: 'txtSaleComp1GarageAdjBuiltIn', value: '0' },
    ],
    saleComp2: [
      {
        type: 'cmb',
        label: 'cmbSaleComp2Garage',
        value: garageOptions[0].value,
        options: garageOptions,
      },
      { type: 'txt', label: 'txtSaleComp2GarageAdjBuiltIn', value: '0' },
    ],
    saleComp3: [
      {
        type: 'cmb',
        label: 'cmbSaleComp3Garage',
        value: garageOptions[0].value,
        options: garageOptions,
      },
      { type: 'txt', label: 'txtSaleComp3GarageAdjBuiltIn', value: '0' },
    ],
    listComp1: [
      {
        type: 'cmb',
        label: 'cmbListComp1Garage',
        value: garageOptions[0].value,
        options: garageOptions,
      },
      { type: 'txt', label: 'txtListComp1GarageAdjBuiltIn', value: '0' },
    ],
    listComp2: [
      {
        type: 'cmb',
        label: 'cmbListComp2Garage',
        value: garageOptions[0].value,
        options: garageOptions,
      },
      { type: 'txt', label: 'txtListComp2GarageAdjBuiltIn', value: '0' },
    ],
    listComp3: [
      {
        type: 'cmb',
        label: 'cmbListComp3Garage',
        value: garageOptions[0].value,
        options: garageOptions,
      },
      { type: 'txt', label: 'txtListComp3GarageAdjBuiltIn', value: '0' },
    ],
  },
  {
    label: 'Pool',
    name: 'pool',
    comparableField: 'Pool',
    category: 'adjustments',
    canAutoAssign: true,
    subject: {
      type: 'cmb',
      label: 'cmbSubjectPool',
      value: poolOptions[0].value,
      options: poolOptions,
    },
    saleComp1: [
      {
        type: 'cmb',
        label: 'cmbSaleComp1Pool',
        value: poolOptions[0].value,
        options: poolOptions,
      },
      { type: 'txt', label: 'txtSaleComp1PoolAdjBuiltIn', value: '0' },
    ],
    saleComp2: [
      {
        type: 'cmb',
        label: 'cmbSaleComp2Pool',
        value: poolOptions[0].value,
        options: poolOptions,
      },
      { type: 'txt', label: 'txtSaleComp2PoolAdjBuiltIn', value: '0' },
    ],
    saleComp3: [
      {
        type: 'cmb',
        label: 'cmbSaleComp3Pool',
        value: poolOptions[0].value,
        options: poolOptions,
      },
      { type: 'txt', label: 'txtSaleComp3PoolAdjBuiltIn', value: '0' },
    ],
    listComp1: [
      {
        type: 'cmb',
        label: 'cmbListComp1Pool',
        value: poolOptions[0].value,
        options: poolOptions,
      },
      { type: 'txt', label: 'txtListComp1PoolAdjBuiltIn', value: '0' },
    ],
    listComp2: [
      {
        type: 'cmb',
        label: 'cmbListComp2Pool',
        value: poolOptions[0].value,
        options: poolOptions,
      },
      { type: 'txt', label: 'txtListComp2PoolAdjBuiltIn', value: '0' },
    ],
    listComp3: [
      {
        type: 'cmb',
        label: 'cmbListComp3Pool',
        value: poolOptions[0].value,
        options: poolOptions,
      },
      { type: 'txt', label: 'txtListComp3PoolAdjBuiltIn', value: '0' },
    ],
  },
  {
    label: 'Porch/Patio/Deck',
    name: 'porchPatioDeck',
    comparableField: 'PorchPatioDeck',
    category: 'adjustments',
    canAutoAssign: true,
    subject: {
      type: 'cmb',
      label: 'cmbSubjectPorchPatioDeck',
      value: outdoorOptions[0].value,
      options: outdoorOptions,
    },
    saleComp1: [
      {
        type: 'cmb',
        label: 'cmbSaleComp1PorchPatioDeck',
        value: outdoorOptions[0].value,
        options: outdoorOptions,
      },
      {
        type: 'txt',
        label: 'txtSaleComp1PorchPatioDeckAdjBuiltIn',
        value: '0',
      },
    ],
    saleComp2: [
      {
        type: 'cmb',
        label: 'cmbSaleComp2PorchPatioDeck',
        value: outdoorOptions[0].value,
        options: outdoorOptions,
      },
      {
        type: 'txt',
        label: 'txtSaleComp2PorchPatioDeckAdjBuiltIn',
        value: '0',
      },
    ],
    saleComp3: [
      {
        type: 'cmb',
        label: 'cmbSaleComp3PorchPatioDeck',
        value: outdoorOptions[0].value,
        options: outdoorOptions,
      },
      {
        type: 'txt',
        label: 'txtSaleComp3PorchPatioDeckAdjBuiltIn',
        value: '0',
      },
    ],
    listComp1: [
      {
        type: 'cmb',
        label: 'cmbListComp1PorchPatioDeck',
        value: outdoorOptions[0].value,
        options: outdoorOptions,
      },
      {
        type: 'txt',
        label: 'txtListComp1PorchPatioDeckAdjBuiltIn',
        value: '0',
      },
    ],
    listComp2: [
      {
        type: 'cmb',
        label: 'cmbListComp2PorchPatioDeck',
        value: outdoorOptions[0].value,
        options: outdoorOptions,
      },
      {
        type: 'txt',
        label: 'txtListComp2PorchPatioDeckAdjBuiltIn',
        value: '0',
      },
    ],
    listComp3: [
      {
        type: 'cmb',
        label: 'cmbListComp3PorchPatioDeck',
        value: outdoorOptions[0].value,
        options: outdoorOptions,
      },
      {
        type: 'txt',
        label: 'txtListComp3PorchPatioDeckAdjBuiltIn',
        value: '0',
      },
    ],
  },
  {
    label: 'Fireplace',
    name: 'Fireplace',
    comparableField: 'Fireplace',
    category: 'adjustments',
    canAutoAssign: true,
    subject: {
      type: 'cmb',
      label: 'cmbSubjectFireplace',
      value: fireplaceOptions[0].value,
      options: fireplaceOptions,
    },
    saleComp1: [
      {
        type: 'cmb',
        label: 'cmbSaleComp1Fireplace',
        value: fireplaceOptions[0].value,
        options: fireplaceOptions,
      },
      { type: 'txt', label: 'txtSaleComp1FireplaceAdjBuiltIn', value: '0' },
    ],
    saleComp2: [
      {
        type: 'cmb',
        label: 'cmbSaleComp2Fireplace',
        value: fireplaceOptions[0].value,
        options: fireplaceOptions,
      },
      { type: 'txt', label: 'txtSaleComp2FireplaceAdjBuiltIn', value: '0' },
    ],
    saleComp3: [
      {
        type: 'cmb',
        label: 'cmbSaleComp3Fireplace',
        value: fireplaceOptions[0].value,
        options: fireplaceOptions,
      },
      { type: 'txt', label: 'txtSaleComp3FireplaceAdjBuiltIn', value: '0' },
    ],
    listComp1: [
      {
        type: 'cmb',
        label: 'cmbListComp1Fireplace',
        value: fireplaceOptions[0].value,
        options: fireplaceOptions,
      },
      { type: 'txt', label: 'txtListComp1FireplaceAdjBuiltIn', value: '0' },
    ],
    listComp2: [
      {
        type: 'cmb',
        label: 'cmbListComp2Fireplace',
        value: fireplaceOptions[0].value,
        options: fireplaceOptions,
      },
      { type: 'txt', label: 'txtListComp2FireplaceAdjBuiltIn', value: '0' },
    ],
    listComp3: [
      {
        type: 'cmb',
        label: 'cmbListComp3Fireplace',
        value: fireplaceOptions[0].value,
        options: fireplaceOptions,
      },
      { type: 'txt', label: 'txtListComp3FireplaceAdjBuiltIn', value: '0' },
    ],
  },
  {
    label: 'Basement',
    comparableField: 'Basement',
    name: 'basement',
    canAutoAssign: true,
    category: 'adjustments',
    subject: {
      type: 'cmb',
      label: 'cmbSubjectBasement',
      value: basementOptions[0].value,
      options: basementOptions,
    },
    saleComp1: [
      {
        type: 'cmb',
        label: 'cmbSaleComp1Basement',
        value: basementOptions[0].value,
        options: basementOptions,
      },
      { type: 'txt', label: 'txtSaleComp1BasementAdjBuiltIn', value: '0' },
    ],
    saleComp2: [
      {
        type: 'cmb',
        label: 'cmbSaleComp2Basement',
        value: basementOptions[0].value,
        options: basementOptions,
      },
      { type: 'txt', label: 'txtSaleComp2BasementAdjBuiltIn', value: '0' },
    ],
    saleComp3: [
      {
        type: 'cmb',
        label: 'cmbSaleComp3Basement',
        value: basementOptions[0].value,
        options: basementOptions,
      },
      { type: 'txt', label: 'txtSaleComp3BasementAdjBuiltIn', value: '0' },
    ],
    listComp1: [
      {
        type: 'cmb',
        label: 'cmbListComp1Basement',
        value: basementOptions[0].value,
        options: basementOptions,
      },
      { type: 'txt', label: 'txtListComp1BasementAdjBuiltIn', value: '0' },
    ],
    listComp2: [
      {
        type: 'cmb',
        label: 'cmbListComp2Basement',
        value: basementOptions[0].value,
        options: basementOptions,
      },
      { type: 'txt', label: 'txtListComp2BasementAdjBuiltIn', value: '0' },
    ],
    listComp3: [
      {
        type: 'cmb',
        label: 'cmbListComp3Basement',
        value: basementOptions[0].value,
        options: basementOptions,
      },
      { type: 'txt', label: 'txtListComp3BasementAdjBuiltIn', value: '0' },
    ],
  },
  {
    label: 'Finished',
    name: 'finished',
    category: 'adjustments',
    subject: {
      type: 'cmb',
      label: 'cmbSubjectIsFinished',
      value: fireplaceOptions[0].value,
      options: fireplaceOptions,
    },
    saleComp1: [
      {
        type: 'cmb',
        label: 'cmbSaleComp1IsFinished',
        value: fireplaceOptions[0].value,
        options: fireplaceOptions,
      },
      { type: 'txt', label: 'txtSaleComp1IsFinishedAdjBuiltIn', value: '0' },
    ],
    saleComp2: [
      {
        type: 'cmb',
        label: 'cmbSaleComp2IsFinished',
        value: fireplaceOptions[0].value,
        options: fireplaceOptions,
      },
      { type: 'txt', label: 'txtSaleComp2IsFinishedAdjBuiltIn', value: '0' },
    ],
    saleComp3: [
      {
        type: 'cmb',
        label: 'cmbSaleComp3IsFinished',
        value: fireplaceOptions[0].value,
        options: fireplaceOptions,
      },
      { type: 'txt', label: 'txtSaleComp3IsFinishedAdjBuiltIn', value: '0' },
    ],
    listComp1: [
      {
        type: 'cmb',
        label: 'cmbListComp1IsFinished',
        value: fireplaceOptions[0].value,
        options: fireplaceOptions,
      },
      { type: 'txt', label: 'txtListComp1IsFinishedAdjBuiltIn', value: '0' },
    ],
    listComp2: [
      {
        type: 'cmb',
        label: 'cmbListComp2IsFinished',
        value: fireplaceOptions[0].value,
        options: fireplaceOptions,
      },
      { type: 'txt', label: 'txtListComp2IsFinishedAdjBuiltIn', value: '0' },
    ],
    listComp3: [
      {
        type: 'cmb',
        label: 'cmbListComp3IsFinished',
        value: fireplaceOptions[0].value,
        options: fireplaceOptions,
      },
      { type: 'txt', label: 'txtListComp3IsFinishedAdjBuiltIn', value: '0' },
    ],
  },
  {
    label: '% Finished',
    name: 'percentFinished',
    category: 'adjustments',
    subject: {
      type: 'cmb',
      label: 'cmbSubjectPercentFinished',
      value: percentOptions[0].value,
      options: percentOptions,
    },
    saleComp1: [
      {
        type: 'cmb',
        label: 'cmbSaleComp1PercentFinished',
        value: percentOptions[0].value,
        options: percentOptions,
      },
      {
        type: 'txt',
        label: 'txtSaleComp1PercentFinishedAdjBuiltIn',
        value: '0',
      },
    ],
    saleComp2: [
      {
        type: 'cmb',
        label: 'cmbSaleComp2PercentFinished',
        value: percentOptions[0].value,
        options: percentOptions,
      },
      {
        type: 'txt',
        label: 'txtSaleComp2PercentFinishedAdjBuiltIn',
        value: '0',
      },
    ],
    saleComp3: [
      {
        type: 'cmb',
        label: 'cmbSaleComp3PercentFinished',
        value: percentOptions[0].value,
        options: percentOptions,
      },
      {
        type: 'txt',
        label: 'txtSaleComp3PercentFinishedAdjBuiltIn',
        value: '0',
      },
    ],
    listComp1: [
      {
        type: 'cmb',
        label: 'cmbListComp1PercentFinished',
        value: percentOptions[0].value,
        options: percentOptions,
      },
      {
        type: 'txt',
        label: 'txtListComp1PercentFinishedAdjBuiltIn',
        value: '0',
      },
    ],
    listComp2: [
      {
        type: 'cmb',
        label: 'cmbListComp2PercentFinished',
        value: percentOptions[0].value,
        options: percentOptions,
      },
      {
        type: 'txt',
        label: 'txtListComp2PercentFinishedAdjBuiltIn',
        value: '0',
      },
    ],
    listComp3: [
      {
        type: 'cmb',
        label: 'cmbListComp3PercentFinished',
        value: percentOptions[0].value,
        options: percentOptions,
      },
      {
        type: 'txt',
        label: 'txtListComp3PercentFinishedAdjBuiltIn',
        value: '0',
      },
    ],
  },
  {
    label: 'Basement Sq.Ft.',
    category: 'adjustments',
    name: 'basementSqFt',
    subject: { type: 'txt', label: 'txtSubjectBasementSqFt', value: '' },
    saleComp1: [
      { type: 'txt', label: 'txtSaleComp1BasementSqFt', value: '' },
      { type: 'txt', label: 'txtSaleComp1BasementSqFtAdjBuiltIn', value: '0' },
    ],
    saleComp2: [
      { type: 'txt', label: 'txtSaleComp2BasementSqFt', value: '' },
      { type: 'txt', label: 'txtSaleComp2BasementSqFtAdjBuiltIn', value: '0' },
    ],
    saleComp3: [
      { type: 'txt', label: 'txtSaleComp3BasementSqFt', value: '' },
      { type: 'txt', label: 'txtSaleComp3BasementSqFtAdjBuiltIn', value: '0' },
    ],
    listComp1: [
      { type: 'txt', label: 'txtListComp1BasementSqFt', value: '' },
      { type: 'txt', label: 'txtListComp1BasementSqFtAdjBuiltIn', value: '0' },
    ],
    listComp2: [
      { type: 'txt', label: 'txtListComp2BasementSqFt', value: '' },
      { type: 'txt', label: 'txtListComp2BasementSqFtAdjBuiltIn', value: '0' },
    ],
    listComp3: [
      { type: 'txt', label: 'txtListComp3BasementSqFt', value: '' },
      { type: 'txt', label: 'txtListComp3BasementSqFtAdjBuiltIn', value: '0' },
    ],
  },
  {
    label: 'Original List Date',
    name: 'originalListDate',
    subject: { type: 'date', label: 'txtSubjectOriginalListDate', value: '' },
    saleComp1: {
      type: 'date',
      label: 'txtSaleComp1OriginalListDate',
      value: '',
    },
    saleComp2: {
      type: 'date',
      label: 'txtSaleComp2OriginalListDate',
      value: '',
    },
    saleComp3: {
      type: 'date',
      label: 'txtSaleComp3OriginalListDate',
      value: '',
    },
    listComp1: {
      type: 'date',
      label: 'txtListComp1OriginalListDate',
      value: '',
    },
    listComp2: {
      type: 'date',
      label: 'txtListComp2OriginalListDate',
      value: '',
    },
    listComp3: {
      type: 'date',
      label: 'txtListComp3OriginalListDate',
      value: '',
    },
  },
  {
    label: 'Current List Date',
    name: 'currentListDate',
    subject: { type: 'date', label: 'txtSubjectCurrentListDate', value: '' },
    saleComp1: {
      type: 'date',
      label: 'txtSaleComp1CurrentListDate',
      value: '',
    },
    saleComp2: {
      type: 'date',
      label: 'txtSaleComp2CurrentListDate',
      value: '',
    },
    saleComp3: {
      type: 'date',
      label: 'txtSaleComp3CurrentListDate',
      value: '',
    },
    listComp1: {
      type: 'date',
      label: 'txtListComp1CurrentListDate',
      value: '',
    },
    listComp2: {
      type: 'date',
      label: 'txtListComp2CurrentListDate',
      value: '',
    },
    listComp3: {
      type: 'date',
      label: 'txtListComp3CurrentListDate',
      value: '',
    },
  },
  {
    label: 'Original List Price',
    name: 'originalListPrice',
    subject: { type: 'txt', label: 'txtSubjectOriginalListPrice', value: '' },
    saleComp1: {
      type: 'txt',
      label: 'txtSaleComp1OriginalListPrice',
      value: '',
    },
    saleComp2: {
      type: 'txt',
      label: 'txtSaleComp2OriginalListPrice',
      value: '',
    },
    saleComp3: {
      type: 'txt',
      label: 'txtSaleComp3OriginalListPrice',
      value: '',
    },
    listComp1: {
      type: 'txt',
      label: 'txtListComp1OriginalListPrice',
      value: '',
    },
    listComp2: {
      type: 'txt',
      label: 'txtListComp2OriginalListPrice',
      value: '',
    },
    listComp3: {
      type: 'txt',
      label: 'txtListComp3OriginalListPrice',
      value: '',
    },
  },
  {
    label: 'List Price',
    name: 'listPrice',
    subject: { type: 'txt', label: 'txtSubjectListPrice', value: '' },
    saleComp1: { type: 'txt', label: 'txtSaleComp1ListPrice', value: '' },
    saleComp2: { type: 'txt', label: 'txtSaleComp2ListPrice', value: '' },
    saleComp3: { type: 'txt', label: 'txtSaleComp3ListPrice', value: '' },
    listComp1: { type: 'txt', label: 'txtListComp1ListPrice', value: '' },
    listComp2: { type: 'txt', label: 'txtListComp2ListPrice', value: '' },
    listComp3: { type: 'txt', label: 'txtListComp3ListPrice', value: '' },
  },
  {
    label: 'Sale Price',
    name: 'salePrice',
    subject: { type: 'txt', label: 'txtSubjectSalePrice', value: '' },
    saleComp1: { type: 'txt', label: 'txtSaleComp1SalePrice', value: '' },
    saleComp2: { type: 'txt', label: 'txtSaleComp2SalePrice', value: '' },
    saleComp3: { type: 'txt', label: 'txtSaleComp3SalePrice', value: '' },
  },
  {
    label: 'Sale Date',
    name: 'saleDate',
    subject: { type: 'date', label: 'txtSubjectSaleDate', value: '' },
    saleComp1: { type: 'date', label: 'txtSaleComp1SaleDate', value: '' },
    saleComp2: { type: 'date', label: 'txtSaleComp2SaleDate', value: '' },
    saleComp3: { type: 'date', label: 'txtSaleComp3SaleDate', value: '' },
  },
  {
    label: 'Financing',
    name: 'financing',
    subject: {
      type: 'cmb',
      label: 'cmbSubjectFinancing',
      value: financingOptions[0].value,
      options: financingOptions,
    },
    saleComp1: {
      type: 'cmb',
      label: 'cmbSaleComp1Financing',
      value: financingOptions[0].value,
      options: financingOptions,
    },
    saleComp2: {
      type: 'cmb',
      label: 'cmbSaleComp2Financing',
      value: financingOptions[0].value,
      options: financingOptions,
    },
    saleComp3: {
      type: 'cmb',
      label: 'cmbSaleComp3Financing',
      value: financingOptions[0].value,
      options: financingOptions,
    },
    listComp1: {
      type: 'cmb',
      label: 'cmbListComp1Financing',
      value: financingOptions[0].value,
      options: financingOptions,
    },
    listComp2: {
      type: 'cmb',
      label: 'cmbListComp2Financing',
      value: financingOptions[0].value,
      options: financingOptions,
    },
    listComp3: {
      type: 'cmb',
      label: 'cmbListComp3Financing',
      value: financingOptions[0].value,
      options: financingOptions,
    },
  },
  {
    label: 'DOM',
    name: 'dom',
    subject: { type: 'txt', label: 'txtSubjectDOM', value: '' },
    saleComp1: { type: 'txt', label: 'txtSaleComp1DOM', value: '' },
    saleComp2: { type: 'txt', label: 'txtSaleComp2DOM', value: '' },
    saleComp3: { type: 'txt', label: 'txtSaleComp3DOM', value: '' },
    listComp1: { type: 'txt', label: 'txtListComp1DOM', value: '' },
    listComp2: { type: 'txt', label: 'txtListComp2DOM', value: '' },
    listComp3: { type: 'txt', label: 'txtListComp3DOM', value: '' },
  },
  {
    label: 'Price Per Sq.Ft.',
    name: 'pricePerSqFt',
    subject: { type: 'txt', label: 'txtSubjectPricePerSqFt', value: '' },
    saleComp1: { type: 'txt', label: 'txtSaleComp1PricePerSqFt', value: '' },
    saleComp2: { type: 'txt', label: 'txtSaleComp2PricePerSqFt', value: '' },
    saleComp3: { type: 'txt', label: 'txtSaleComp3PricePerSqFt', value: '' },
    listComp1: { type: 'txt', label: 'txtListComp1PricePerSqFt', value: '' },
    listComp2: { type: 'txt', label: 'txtListComp2PricePerSqFt', value: '' },
    listComp3: { type: 'txt', label: 'txtListComp3PricePerSqFt', value: '' },
  },
  {
    label: 'Adjustments',
    name: 'adjustments',
    subject: { type: 'txt', label: 'txtSubjectAdjustments', value: '' },
    saleComp1: { type: 'txt', label: 'txtSaleComp1Adjustments', value: '' },
    saleComp2: { type: 'txt', label: 'txtSaleComp2Adjustments', value: '' },
    saleComp3: { type: 'txt', label: 'txtSaleComp3Adjustments', value: '' },
    listComp1: { type: 'txt', label: 'txtListComp1Adjustments', value: '' },
    listComp2: { type: 'txt', label: 'txtListComp2Adjustments', value: '' },
    listComp3: { type: 'txt', label: 'txtListComp3Adjustments', value: '' },
  },
  {
    label: 'CompTotals',
    name: 'compTotals',
    subject: { type: 'txt', label: 'txtSubjectCompTotals', value: '' },
    saleComp1: { type: 'txt', label: 'txtSaleComp1CompTotals', value: '' },
    saleComp2: { type: 'txt', label: 'txtSaleComp2CompTotals', value: '' },
    saleComp3: { type: 'txt', label: 'txtSaleComp3CompTotals', value: '' },
    listComp1: { type: 'txt', label: 'txtListComp1CompTotals', value: '' },
    listComp2: { type: 'txt', label: 'txtListComp2CompTotals', value: '' },
    listComp3: { type: 'txt', label: 'txtListComp3CompTotals', value: '' },
  },
];
