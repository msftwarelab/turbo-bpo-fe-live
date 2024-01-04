const deepDiff = (oldValue, newValue) =>
  Object.keys(newValue).reduce((diff, key) => {
    if (oldValue[key] === newValue[key]) return diff;
    return {
      ...diff,
      [key]: newValue[key],
    };
  }, {});

export default deepDiff;
