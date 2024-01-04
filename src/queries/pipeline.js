import gql from 'graphql-tag';

const PIPELINE = gql`
  query Pipeline($id: ID!) {
    pipeline(id: $id) {
      id
      authorName
      authorId
      orderNumber
      address
      country
      location
      company
      companyId
      type
      orderType
      zipCode
      assign
      assignId
      assignDateTime
      dueDateTime
      holdDateTime
      pauseDateTime
      otherCompany
      mls
      isRushOrder
      isSuperRush
      isInspection
      isHold
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
      isProcessIform
      isProcessIfill
      isProcessReview
      processIformModifiedDate
      ifillProcessModifiedDate
      processReviewModifiedDate
      pipelineHistory {
        logDateTime
        action
        value
        modifiedBy
      }
      assignedHistory {
        logDateTime
        action
        assignee
        assigneeID
        assignedBy
        assignedByID
        modifiedBy
      }
    }
  }
`;

export default PIPELINE;
