const hasRole = (userRoles, itemRoles) => {
  let result = false;
  userRoles.map(item => {
    if (itemRoles.includes(item)) result = true;
    return false;
  });
  return result;
};

export default hasRole;
