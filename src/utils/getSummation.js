import setCurrency from 'utils/setCurrency';

export default items => {
  const itemCount = items.length;
  let total = 0;
  for (let i = 0; i < itemCount; i++) {
    total += parseFloat(items[i]);
  }

  return setCurrency('USD', total, 2);
};
