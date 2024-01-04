export default (state = {}) => {
  const cleanState = {};
  Object.keys(state).forEach(key => {
    if (state[key] !== '') cleanState[key] = state[key];
  });
  return cleanState;
};
