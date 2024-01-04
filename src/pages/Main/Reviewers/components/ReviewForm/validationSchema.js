import * as yup from 'yup';
import isEmpty from 'lodash/isEmpty';

export default yup.object().shape({
  pipelineId: yup.string().when('id', {
    is: val => isEmpty(val),
    then: yup
      .string()
      .required('required')
      .nullable(),
  }),
  reviewDescription: yup
    .string()
    .required('required')
    .nullable(),
});
