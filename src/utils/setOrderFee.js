export default (values = {}, priceModule = {}) => {
  const orderTypePayment = {
    Interior: priceModule.interior || 0,
    Exterior: priceModule.exterior || 0,
    'Data Entry': priceModule.dataEntry || 0,
    'Condition Report': priceModule.conditionReport || 0,
  };

  const rushOrderPayment = priceModule.rush || 0;
  const superRushPayment = priceModule.superRush || 0;
  const inspectionPayment = priceModule.inspection || 0;
  const initialBpoPayment = priceModule.initialBPO || 0;

  const orderFee =
    (orderTypePayment[values.orderType] || 0) +
    (values.isRushOrder ? rushOrderPayment : 0) +
    (values.isSuperRush ? superRushPayment : 0) +
    (values.isInspection ? inspectionPayment : 0) +
    (values.isInitialBpo ? initialBpoPayment : 0) +
    (values.companyId === 'OTHERS' ? 3 : 0);

  return orderFee;
};
