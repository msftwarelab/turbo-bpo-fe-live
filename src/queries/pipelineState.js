import gql from 'graphql-tag';

const PIPELINE_STATE = gql`
  query PipelineState {
    pipelineState {
      maxDailyVolume
      standByAutoComplete
      isRush
      isNewOrder
      orderMessage
      tTSlow
      tTModerate
      tTBusy
      tTMax
      tLSlow
      tLModerate
      tLBusy
      oPInterior
      oPExterior
      oPDataEntry
      oPRush
      oPSuperRush
      oPConditionReport
      oPRentalAddendum
      oPInitialBPO
      oPInspection
      pCIsAcceptOrder
      pCcatchTime
      oAOfferLimitInMin
      oAIsAutoAssign
      qCElapseTime
      todayOrderCount
    }
  }
`;

export default PIPELINE_STATE;
