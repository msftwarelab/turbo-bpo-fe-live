import gql from 'graphql-tag';

export const PIPELINE_STATE = gql`
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
    }
  }
`;

export default {};
