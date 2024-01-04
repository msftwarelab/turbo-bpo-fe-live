export default (values = {}) => {
  const rushOrderHour = 6;
  const superRushHour = 2;

  let orderHours =
    (values.isRushOrder ? rushOrderHour : 0) +
    (values.isSuperRush ? superRushHour : 0);

  if (values.assign !== 'Turbo BPO') orderHours = 0;

  return orderHours;
};
