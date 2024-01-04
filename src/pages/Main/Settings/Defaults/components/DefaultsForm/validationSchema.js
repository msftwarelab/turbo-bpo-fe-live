import * as yup from 'yup';

export default yup.object().shape({
  listingType: yup
    .string()
    .required('required')
    .nullable(),
  alwayssubmitOrder: yup
    .boolean()
    .required('required')
    .nullable(),
  autoCompleteStandbyOrder: yup
    .boolean()
    .required('required')
    .nullable(),
  thirdSearchFilterByComplexName: yup
    .boolean()
    .required('required')
    .nullable(),
  thirdSearchFilterByCity: yup
    .boolean()
    .required('required')
    .nullable(),
  thirdSearchFilterByZip: yup
    .boolean()
    .required('required')
    .nullable(),
  thirdSearchFilterByCountry: yup
    .boolean()
    .required('required')
    .nullable(),
  useDefaults: yup
    .boolean()
    .required('required')
    .nullable(),
  useIformValidations: yup
    .boolean()
    .required('required')
    .nullable(),
});
