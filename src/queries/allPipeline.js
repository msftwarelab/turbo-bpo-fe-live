import gql from 'graphql-tag';

const ALL_PIPELINE = gql`
  query AllPipeline($filter: PipelineFilterInput) {
    allPipeline(filter: $filter) {
      totalCount
      results {
        id
        authorName
        authorId
        orderNumber
        address
        country
        location
        company
        companyId
        premiumCompany
        premiumCompanyId
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
        isQc
        isRushOrder
        isSuperRush
        isInspection
        isInitialBpo
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
        lastUpdateTime
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
        isBilled
      }
    }
  }
`;

export default ALL_PIPELINE;
