const getGroupedObject = (arr, comp) => {
  const grouped = arr.reduce((item, a) => {
    const newItem = item;
    newItem[a[comp]] = newItem[a[comp]] || [];
    newItem[a[comp]].push(a);
    return newItem;
  }, Object.create(null));
  return grouped;
};

export default getGroupedObject;
