import * as yup from 'yup';
import isEmpty from 'lodash/isEmpty';

export default yup.object().shape({
  tag: yup
    .string()
    .required('required')
    .nullable(),
  company: yup.object().test(null, 'required', function(item) {
    const { tag } = this.parent;
    if (tag === 'VENDOR') {
      if (!isEmpty(item)) return true;
      return false;
    }
    return true;
  }),
  client: yup.object().test(null, 'required', function(item) {
    const { tag } = this.parent;
    if (tag === 'SPECIAL') {
      if (!isEmpty(item)) return true;
      return false;
    }
    return true;
  }),
  file: yup.mixed().required('required'),
});
