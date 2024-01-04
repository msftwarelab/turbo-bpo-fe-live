import errorMessages from 'constants/errorMessages';

export default err => {
  let errMessage = err ? err.toString() : 'Something went wrong!';
  if (err && err.graphQLErrors && err.graphQLErrors.length > 0) {
    const error = err.graphQLErrors[0];

    if (error.code) {
      errMessage = errorMessages[error.code];
    } else if (error.message.length > 0) {
      errMessage = error.message;
    } else {
      errMessage = 'Something went wrong!';
    }
  }
  return errMessage;
};
