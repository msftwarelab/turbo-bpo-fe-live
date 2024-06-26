import gql from 'graphql-tag';

const IFORM = gql`
  query Iform($pipelineId: ID!) {
    iform(pipelineId: $pipelineId) {
      id
      formType
      pipelineId
      txtClient
      txtCompany
      txtOrderNumber
      cmbOrderType
      txtAddress
      txtLocation
      txtBrokerChecker
      txtPreparerInfoAgent
      txtPreparerInfoAgentLicense
      txtPreparerInfoBroker
      txtPreparerInfoBrokerLicense
      txtPreparerInfoAddress
      txtPreparerInfoBrokerage
      txtPreparerInfoAgentCompany
      txtPreparerInfoPhone
      txtPreparerInfoYearsOfExperience
      txtPreparerInfoEmail
      txtSubjectAddress
      txtPreparerInfoMilesAwayFromSubject
      txtAgentZip
      txtAgentCity
      txtAgentState
      txtDisclaimer
      cmbLocation
      txtCounty
      txtTrullia
      txtZillow
      txtFindcompsnow
      txtAverage
      cmbForm
      cmbForm2
      txtSaleComp1Address
      txtSaleComp2Address
      txtSaleComp3Address
      txtListComp1Address
      txtListComp2Address
      txtListComp3Address
      txtSubjectState
      txtSaleComp1State
      txtSaleComp2State
      txtSaleComp3State
      txtListComp1State
      txtListComp2State
      txtListComp3State
      txtSubjectCity
      txtSaleComp1City
      txtSaleComp2City
      txtSaleComp3City
      txtListComp1City
      txtListComp2City
      txtListComp3City
      txtSubjectnoUnit
      txtSubjectUnitNo
      txtSaleComp1noUnit
      txtSaleComp1UnitNo
      txtSaleComp2noUnit
      txtSaleComp2UnitNo
      txtSaleComp3noUnit
      txtSaleComp3UnitNo
      txtListComp1noUnit
      txtListComp1UnitNo
      txtListComp2noUnit
      txtListComp2UnitNo
      txtListComp3noUnit
      txtListComp3UnitNo
      txtSubjectUnits
      txtSaleComp1Units
      txtSaleComp2Units
      txtSaleComp3Units
      txtListComp1Units
      txtListComp2Units
      txtListComp3Units
      txtSubjectZip
      txtSaleComp1Zip
      txtSaleComp2Zip
      txtSaleComp3Zip
      txtListComp1Zip
      txtListComp2Zip
      txtListComp3Zip
      txtSubjectProximity
      txtSaleComp1Proximity
      txtSaleComp2Proximity
      txtSaleComp3Proximity
      txtListComp1Proximity
      txtListComp2Proximity
      txtListComp3Proximity
      txtSubjectDataSource
      txtSaleComp1DataSource
      txtSaleComp2DataSource
      txtSaleComp3DataSource
      txtListComp1DataSource
      txtListComp2DataSource
      txtListComp3DataSource
      txtSubjectMLSNumber
      txtSaleComp1MLSNumber
      txtSaleComp2MLSNumber
      txtSaleComp3MLSNumber
      txtListComp1MLSNumber
      txtListComp2MLSNumber
      txtListComp3MLSNumber
      cmbSubjectSaleType
      cmbSaleComp1SaleType
      cmbSaleComp2SaleType
      cmbSaleComp3SaleType
      cmbListComp1SaleType
      cmbListComp2SaleType
      cmbListComp3SaleType
      cmbSubjectType
      cmbSaleComp1Type
      cmbSaleComp2Type
      cmbSaleComp3Type
      cmbListComp1Type
      cmbListComp2Type
      cmbListComp3Type
      cmbSubjectStyle
      cmbSaleComp1Style
      txtSaleComp1StyleAdjBuiltIn
      cmbSaleComp2Style
      txtSaleComp2StyleAdjBuiltIn
      cmbSaleComp3Style
      txtSaleComp3StyleAdjBuiltIn
      cmbListComp1Style
      txtListComp1StyleAdjBuiltIn
      cmbListComp2Style
      txtListComp2StyleAdjBuiltIn
      cmbListComp3Style
      txtListComp3StyleAdjBuiltIn
      cmbSubjectExtFinish
      cmbSaleComp1ExtFinish
      txtSaleComp1ExtFinishAdjBuiltIn
      cmbSaleComp2ExtFinish
      txtSaleComp2ExtFinishAdjBuiltIn
      cmbSaleComp3ExtFinish
      txtSaleComp3ExtFinishAdjBuiltIn
      cmbListComp1ExtFinish
      txtListComp1ExtFinishAdjBuiltIn
      cmbListComp2ExtFinish
      txtListComp2ExtFinishAdjBuiltIn
      cmbListComp3ExtFinish
      txtListComp3ExtFinishAdjBuiltIn
      cmbSubjectCondition
      cmbSaleComp1Condition
      txtSaleComp1ConditionAdjBuiltIn
      cmbSaleComp2Condition
      txtSaleComp2ConditionAdjBuiltIn
      cmbSaleComp3Condition
      txtSaleComp3ConditionAdjBuiltIn
      cmbListComp1Condition
      txtListComp1ConditionAdjBuiltIn
      cmbListComp2Condition
      txtListComp2ConditionAdjBuiltIn
      cmbListComp3Condition
      txtListComp3ConditionAdjBuiltIn
      cmbSubjectQuality
      cmbSaleComp1Quality
      txtSaleComp1QualityAdjBuiltIn
      cmbSaleComp2Quality
      txtSaleComp2QualityAdjBuiltIn
      cmbSaleComp3Quality
      txtSaleComp3QualityAdjBuiltIn
      cmbListComp1Quality
      txtListComp1QualityAdjBuiltIn
      cmbListComp2Quality
      txtListComp2QualityAdjBuiltIn
      cmbListComp3Quality
      txtListComp3QualityAdjBuiltIn
      cmbSubjectView
      cmbSaleComp1View
      txtSaleComp1ViewAdjBuiltIn
      cmbSaleComp2View
      txtSaleComp2ViewAdjBuiltIn
      cmbSaleComp3View
      txtSaleComp3ViewAdjBuiltIn
      cmbListComp1View
      txtListComp1ViewAdjBuiltIn
      cmbListComp2View
      txtListComp2ViewAdjBuiltIn
      cmbListComp3View
      txtListComp3ViewAdjBuiltIn
      txtSubjectSubdivision
      txtSaleComp1Subdivision
      txtSaleComp2Subdivision
      txtSaleComp3Subdivision
      txtListComp1Subdivision
      txtListComp2Subdivision
      txtListComp3Subdivision
      txtSubjectHOAFee
      txtSaleComp1HOAFee
      txtSaleComp2HOAFee
      txtSaleComp3HOAFee
      txtListComp1HOAFee
      txtListComp2HOAFee
      txtListComp3HOAFee
      txtSubjectTotalRooms
      txtSaleComp1TotalRooms
      txtSaleComp1TotalRoomsAdjBuiltIn
      txtSaleComp2TotalRooms
      txtSaleComp2TotalRoomsAdjBuiltIn
      txtSaleComp3TotalRooms
      txtSaleComp3TotalRoomsAdjBuiltIn
      txtListComp1TotalRooms
      txtListComp1TotalRoomsAdjBuiltIn
      txtListComp2TotalRooms
      txtListComp2TotalRoomsAdjBuiltIn
      txtListComp3TotalRooms
      txtListComp3TotalRoomsAdjBuiltIn
      txtSubjectBedrooms
      txtSaleComp1Bedrooms
      txtSaleComp1BedroomsAdjBuiltIn
      txtSaleComp2Bedrooms
      txtSaleComp2BedroomsAdjBuiltIn
      txtSaleComp3Bedrooms
      txtSaleComp3BedroomsAdjBuiltIn
      txtListComp1Bedrooms
      txtListComp1BedroomsAdjBuiltIn
      txtListComp2Bedrooms
      txtListComp2BedroomsAdjBuiltIn
      txtListComp3Bedrooms
      txtListComp3BedroomsAdjBuiltIn
      txtSubjectFullBaths
      txtSaleComp1FullBaths
      txtSaleComp1FullBathsAdjBuiltIn
      txtSaleComp2FullBaths
      txtSaleComp2FullBathsAdjBuiltIn
      txtSaleComp3FullBaths
      txtSaleComp3FullBathsAdjBuiltIn
      txtListComp1FullBaths
      txtListComp1FullBathsAdjBuiltIn
      txtListComp2FullBaths
      txtListComp2FullBathsAdjBuiltIn
      txtListComp3FullBaths
      txtListComp3FullBathsAdjBuiltIn
      txtSubjectHalfBaths
      txtSaleComp1HalfBaths
      txtSaleComp1HalfBathsAdjBuiltIn
      txtSaleComp2HalfBaths
      txtSaleComp2HalfBathsAdjBuiltIn
      txtSaleComp3HalfBaths
      txtSaleComp3HalfBathsAdjBuiltIn
      txtListComp1HalfBaths
      txtListComp1HalfBathsAdjBuiltIn
      txtListComp2HalfBaths
      txtListComp2HalfBathsAdjBuiltIn
      txtListComp3HalfBaths
      txtListComp3HalfBathsAdjBuiltIn
      txtSubjectGLA
      txtSaleComp1GLA
      txtSaleComp1GLAAdjBuiltIn
      txtSaleComp2GLA
      txtSaleComp2GLAAdjBuiltIn
      txtSaleComp3GLA
      txtSaleComp3GLAAdjBuiltIn
      txtListComp1GLA
      txtListComp1GLAAdjBuiltIn
      txtListComp2GLA
      txtListComp2GLAAdjBuiltIn
      txtListComp3GLA
      txtListComp3GLAAdjBuiltIn
      txtSubjectYearBuilt
      txtSaleComp1YearBuilt
      txtSaleComp1YearBuiltAdjBuiltIn
      txtSaleComp2YearBuilt
      txtSaleComp2YearBuiltAdjBuiltIn
      txtSaleComp3YearBuilt
      txtSaleComp3YearBuiltAdjBuiltIn
      txtListComp1YearBuilt
      txtListComp1YearBuiltAdjBuiltIn
      txtListComp2YearBuilt
      txtListComp2YearBuiltAdjBuiltIn
      txtListComp3YearBuilt
      txtListComp3YearBuiltAdjBuiltIn
      txtSubjectAge
      txtSaleComp1Age
      txtSaleComp2Age
      txtSaleComp3Age
      txtListComp1Age
      txtListComp2Age
      txtListComp3Age
      txtSubjectAcres
      txtSaleComp1Acres
      txtSaleComp1AcresAdjBuiltIn
      txtSaleComp2Acres
      txtSaleComp2AcresAdjBuiltIn
      txtSaleComp3Acres
      txtSaleComp3AcresAdjBuiltIn
      txtListComp1Acres
      txtListComp1AcresAdjBuiltIn
      txtListComp2Acres
      txtListComp2AcresAdjBuiltIn
      txtListComp3Acres
      txtListComp3AcresAdjBuiltIn
      txtSubjectSquareFeet
      txtSaleComp1SquareFeet
      txtSaleComp2SquareFeet
      txtSaleComp3SquareFeet
      txtListComp1SquareFeet
      txtListComp2SquareFeet
      txtListComp3SquareFeet
      cmbSubjectGarage
      cmbSaleComp1Garage
      txtSaleComp1GarageAdjBuiltIn
      cmbSaleComp2Garage
      txtSaleComp2GarageAdjBuiltIn
      cmbSaleComp3Garage
      txtSaleComp3GarageAdjBuiltIn
      cmbListComp1Garage
      txtListComp1GarageAdjBuiltIn
      cmbListComp2Garage
      txtListComp2GarageAdjBuiltIn
      cmbListComp3Garage
      txtListComp3GarageAdjBuiltIn
      cmbSubjectPool
      cmbSaleComp1Pool
      txtSaleComp1PoolAdjBuiltIn
      cmbSaleComp2Pool
      txtSaleComp2PoolAdjBuiltIn
      cmbSaleComp3Pool
      txtSaleComp3PoolAdjBuiltIn
      cmbListComp1Pool
      txtListComp1PoolAdjBuiltIn
      cmbListComp2Pool
      txtListComp2PoolAdjBuiltIn
      cmbListComp3Pool
      txtListComp3PoolAdjBuiltIn
      cmbSubjectPorchPatioDeck
      cmbSaleComp1PorchPatioDeck
      txtSaleComp1PorchPatioDeckAdjBuiltIn
      cmbSaleComp2PorchPatioDeck
      txtSaleComp2PorchPatioDeckAdjBuiltIn
      cmbSaleComp3PorchPatioDeck
      txtSaleComp3PorchPatioDeckAdjBuiltIn
      cmbListComp1PorchPatioDeck
      txtListComp1PorchPatioDeckAdjBuiltIn
      cmbListComp2PorchPatioDeck
      txtListComp2PorchPatioDeckAdjBuiltIn
      cmbListComp3PorchPatioDeck
      txtListComp3PorchPatioDeckAdjBuiltIn
      cmbSubjectFireplace
      cmbSaleComp1Fireplace
      txtSaleComp1FireplaceAdjBuiltIn
      cmbSaleComp2Fireplace
      txtSaleComp2FireplaceAdjBuiltIn
      cmbSaleComp3Fireplace
      txtSaleComp3FireplaceAdjBuiltIn
      cmbListComp1Fireplace
      txtListComp1FireplaceAdjBuiltIn
      cmbListComp2Fireplace
      txtListComp2FireplaceAdjBuiltIn
      cmbListComp3Fireplace
      txtListComp3FireplaceAdjBuiltIn
      cmbSubjectBasement
      cmbSaleComp1Basement
      txtSaleComp1BasementAdjBuiltIn
      cmbSaleComp2Basement
      txtSaleComp2BasementAdjBuiltIn
      cmbSaleComp3Basement
      txtSaleComp3BasementAdjBuiltIn
      cmbListComp1Basement
      txtListComp1BasementAdjBuiltIn
      cmbListComp2Basement
      txtListComp2BasementAdjBuiltIn
      cmbListComp3Basement
      txtListComp3BasementAdjBuiltIn
      cmbSubjectIsFinished
      cmbSaleComp1IsFinished
      txtSaleComp1IsFinishedAdjBuiltIn
      cmbSaleComp2IsFinished
      txtSaleComp2IsFinishedAdjBuiltIn
      cmbSaleComp3IsFinished
      txtSaleComp3IsFinishedAdjBuiltIn
      cmbListComp1IsFinished
      txtListComp1IsFinishedAdjBuiltIn
      cmbListComp2IsFinished
      txtListComp2IsFinishedAdjBuiltIn
      cmbListComp3IsFinished
      txtListComp3IsFinishedAdjBuiltIn
      cmbSubjectPercentFinished
      cmbSaleComp1PercentFinished
      txtSaleComp1PercentFinishedAdjBuiltIn
      cmbSaleComp2PercentFinished
      txtSaleComp2PercentFinishedAdjBuiltIn
      cmbSaleComp3PercentFinished
      txtSaleComp3PercentFinishedAdjBuiltIn
      cmbListComp1PercentFinished
      txtListComp1PercentFinishedAdjBuiltIn
      cmbListComp2PercentFinished
      txtListComp2PercentFinishedAdjBuiltIn
      cmbListComp3PercentFinished
      txtListComp3PercentFinishedAdjBuiltIn
      txtSubjectBasementSqFt
      txtSaleComp1BasementSqFt
      txtSaleComp1BasementSqFtAdjBuiltIn
      txtSaleComp2BasementSqFt
      txtSaleComp2BasementSqFtAdjBuiltIn
      txtSaleComp3BasementSqFt
      txtSaleComp3BasementSqFtAdjBuiltIn
      txtListComp1BasementSqFt
      txtListComp1BasementSqFtAdjBuiltIn
      txtListComp2BasementSqFt
      txtListComp2BasementSqFtAdjBuiltIn
      txtListComp3BasementSqFt
      txtListComp3BasementSqFtAdjBuiltIn
      txtSubjectOriginalListDate
      txtSaleComp1OriginalListDate
      txtSaleComp2OriginalListDate
      txtSaleComp3OriginalListDate
      txtListComp1OriginalListDate
      txtListComp2OriginalListDate
      txtListComp3OriginalListDate
      txtSubjectCurrentListDate
      txtSaleComp1CurrentListDate
      txtSaleComp2CurrentListDate
      txtSaleComp3CurrentListDate
      txtListComp1CurrentListDate
      txtListComp2CurrentListDate
      txtListComp3CurrentListDate
      txtSubjectOriginalListPrice
      txtSaleComp1OriginalListPrice
      txtSaleComp2OriginalListPrice
      txtSaleComp3OriginalListPrice
      txtListComp1OriginalListPrice
      txtListComp2OriginalListPrice
      txtListComp3OriginalListPrice
      txtSubjectListPrice
      txtSaleComp1ListPrice
      txtSaleComp2ListPrice
      txtSaleComp3ListPrice
      txtListComp1ListPrice
      txtListComp2ListPrice
      txtListComp3ListPrice
      txtSubjectSalePrice
      txtSaleComp1SalePrice
      txtSaleComp2SalePrice
      txtSaleComp3SalePrice
      txtSubjectSaleDate
      txtSaleComp1SaleDate
      txtSaleComp2SaleDate
      txtSaleComp3SaleDate
      cmbSubjectFinancing
      cmbSaleComp1Financing
      cmbSaleComp2Financing
      cmbSaleComp3Financing
      cmbListComp1Financing
      cmbListComp2Financing
      cmbListComp3Financing
      txtSubjectDOM
      txtSaleComp1DOM
      txtSaleComp2DOM
      txtSaleComp3DOM
      txtListComp1DOM
      txtListComp2DOM
      txtListComp3DOM
      txtSubjectPricePerSqFt
      txtSaleComp1PricePerSqFt
      txtSaleComp2PricePerSqFt
      txtSaleComp3PricePerSqFt
      txtListComp1PricePerSqFt
      txtListComp2PricePerSqFt
      txtListComp3PricePerSqFt
      txtSubjectAdjustments
      txtSaleComp1Adjustments
      txtSaleComp2Adjustments
      txtSaleComp3Adjustments
      txtListComp1Adjustments
      txtListComp2Adjustments
      txtListComp3Adjustments
      txtSubjectCompTotals
      txtSaleComp1CompTotals
      txtSaleComp2CompTotals
      txtSaleComp3CompTotals
      txtListComp1CompTotals
      txtListComp2CompTotals
      txtListComp3CompTotals
      cmbListComp1CommentType
      txtListComp1ComparableComments
      txtListComp1FormatAdjustments
      txtListComp1MLSComments
      cmbListComp2CommentType
      txtListComp2ComparableComments
      txtListComp2FormatAdjustments
      txtListComp2MLSComments
      cmbListComp3CommentType
      txtListComp3ComparableComments
      txtListComp3FormatAdjustments
      txtListComp3MLSComments
      cmbSaleComp1CommentType
      txtSaleComp1ComparableComments
      txtSaleComp1FormatAdjustments
      txtSaleComp1MLSComments
      cmbSaleComp2CommentType
      txtSaleComp2ComparableComments
      txtSaleComp2FormatAdjustments
      txtSaleComp2MLSComments
      cmbSaleComp3CommentType
      txtSaleComp3ComparableComments
      txtSaleComp3FormatAdjustments
      txtSaleComp3MLSComments
      cmbNeighborhoodTrend
      txtMonthlyPecent
      txtEstimatedRent
      txtEstimatedDaysOnMarket
      txtNoBoarded
      txtNoOfActive
      txt6MonthPecent
      txtAnnualPecent
      txtListings
      cmbSupply
      txtListingsMinValue
      txtListingsRange1
      txtListingsMedValue
      txtListingsMaxValue
      txtListingsRange2
      txtListingsDOM
      txtListingsDOMRange1
      txtListingsDOMRange2
      cmbREOTrend
      txtNoOfFM
      txtNoOfSS
      txtNoOfREO
      txtNoOfDistressed
      txtSales
      cmbDemand
      txtSalesRange1
      txtSalesMedValue
      txtSalesRange2
      txtSalesDOM
      txtSalesDOMRange1
      txtSalesDOMRange2
      txtZillowNeighborhoodTrend
      txtNeighborhoodTrendComments
      txtTotalListings
      txtTotalSales
      txtNoOfREOListings
      txtNoOfSSListings
      txtNoOfREOSales
      txtNoOfSSSales
      txtTaxID
      txtLastSaleDate
      txtLastSalePrice
      cmbIsListed
      txtOwnerOccupied
      txtRenterOccupied
      txtMarketRent
      txtNoOfRentals
      txtTypicalDOM
      txtNoRentHomes
      txtTypicalRentalRates
      adjustmentPrice
      txtCalculatedGLA
      txtCalculatedAge
      txtCalculatedSaleDates
      txtCalculatedProximity
      txtCalculatedStyle
      txtCalculatedMonthsSupply
      txtCalculatedProxim
      txtCalculatedGLAs
      txtCalculatedAges
      txtCalculatedCond
      txtCalculatedView
      txtCalculatedStyle1
      txtCalculatedLots
      txtCalculatedBeds
      txtCalculatedBath
      rdbresaletext
      rdbmarketedtext
      txtpmi
      txtOtherComments
      txtcbnew
      txtcbold
      txtcbstyle
      txtcblot
      txtcbview
      txtcbdamage
      txtcbupgrade
      txtcbinfluence
      txtSubjectComments
      txtNeighborhoodComments
      txtNeighborhoodTrend
      txtValidation1
      txtUniqueComments
      txtMarketingStrategy
      txtDisclaimer2
      txtBrokerComments
      txtValidation
      txt30DayQuickSale
      txt60DayQuickSale
      txt90DayAsIsValue
      txt120DayQuickSale
      txt180DayQuickSale
      txtListPriceFinalValues
      txt30DayListPriceFinalValues
      txt30DayQuickSaleRepaired
      txt60DayQuickSaleRepaired
      txt90DayAsIsValueRepaired
      txt120DayQuickSaleRepaired
      txt180DayQuickSaleRepaired
      txtListPriceRepaired
      txt30DayListPriceRepaired
      cmbHouse
      cmbPositive
      cmbNegative
      cmbView
      cmbMarket
      cmbPricing
      cmbListing
      cmbExtra
      txtUnique
      priceComment
      rangeComment
      proxException
      glaException
      ageException
      condException
      viewException
      styleException
      lotException
      bedException
      bathException
      history {
        createdDate
        updatedDate
        modifiedBy
        url
      }
    }
  }
`;

export default IFORM;
