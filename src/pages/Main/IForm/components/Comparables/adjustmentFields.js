const adjustmentFields = [
  { category: 'Acres/Square Feet', inputType: 'text', merge: false },
  { category: 'Basement', inputType: 'cmb', merge: false },
  { category: 'Bedrooms', inputType: 'text', merge: false },
  { category: 'Condition', inputType: 'cmb', merge: false },
  { category: 'Fireplace', inputType: 'cmb', merge: false },
  { category: 'Full Baths', inputType: 'text', merge: false },
  { category: 'Half Baths', inputType: 'text', merge: false },
  { category: 'GLA', inputType: 'text', merge: false },
  { category: 'Pool', inputType: 'cmb', merge: false },
  { category: 'PorchPatioDeck', inputType: 'cmb', merge: true },
  { category: 'Garage', inputType: 'cmb', merge: true },
  { category: 'Quality', inputType: 'cmb', merge: false },
  { category: 'View', inputType: 'cmb', merge: false },
  { category: 'Year Built', inputType: 'text', merge: false },
  { category: 'Exterior Finish', inputType: 'cmb', merge: false },
];

export default adjustmentFields;
