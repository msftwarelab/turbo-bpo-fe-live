export default (userPriceModule, pipelineState) => {
  return {
    interior: userPriceModule.orderinterior || pipelineState.oPInterior,
    exterior: userPriceModule.orderexterior || pipelineState.oPExterior,
    dataEntry: userPriceModule.orderdataEntry || pipelineState.oPDataEntry,
    conditionReport:
      userPriceModule.orderconditionReport || pipelineState.oPConditionReport,
    rush: userPriceModule.orderrush || pipelineState.oPRush,
    superRush: userPriceModule.ordersuperRush || pipelineState.oPSuperRush,
    inspection: userPriceModule.orderinspection || pipelineState.oPInspection,
    initialBPO: userPriceModule.orderinitialBPO || pipelineState.oPInitialBPO,
  };
};
