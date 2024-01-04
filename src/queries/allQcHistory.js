import gql from 'graphql-tag';

const ALL_QC_HISTORY = gql`
  query AllQCHistory($filter: QcHistoryFilterInput) {
    allQcHistory(filter: $filter) {
      totalCount
      results {
        id
        pipelineId
        orderNumber
        address
        country
        location
        company
        type
        orderType
        objective
        assign
        assignId
        mls
        isRushOrder
        isSuperRush
        isInspection
        isInitialBpo
        orderFee
        totalFee
        isSyncedToTurboBpo
        createdDateTime
        lastUpdateTime
        ratingOverAll
        ratingTimeliness
        ratingQuality
        ratingFeedback
        status
        pipelineQualityControlTotal
        pipelinePhotoTotal
        pipelineDocTotal
        pipelineNoteTotal
        authorId
        authorName
        isProcessIform
        processIformModifiedDate
        isProcessIfill
        ifillProcessModifiedDate
        isProcessReview
        processReviewModifiedDate
        qcHistory {
          status
          reason
          date
          cratedby
          currentAssignee
          newAssignee
        }
      }
    }
  }
`;

export default ALL_QC_HISTORY;
