import gql from 'graphql-tag';

const ALL_IFORM_GRID = gql`
  query AllIformGrid($pipelineId: ID!, $filter: IformGridFilterInput) {
    allIformGrid(pipelineId: $pipelineId, filter: $filter) {
      totalCount
      results {
        id
        address
        age
        basementFinishedSqFt
        basementSquareFeet
        basementType
        bathrooms
        bedrooms
        carport
        city
        construction
        daysOnMarket
        exterior
        exteriorFeatures
        fireplace
        fullBaths
        garage
        garageDescription
        halfBaths
        hOAFee
        listDate
        listPrice
        lotSize
        mlsNumber
        mlsComments
        originalListDate
        originalListPrice
        parkingSpacesCarport
        parkingSpacesGarage
        pool
        porch
        priceClosed
        priceList
        propertyStyle
        proplmg
        proximity
        realEstateOwned
        saleDate
        salePrice
        saleType
        selType
        shortSale
        squareFootage
        status
        streetDirection
        streetName
        streetNumber
        streetType
        subdivision
        termsOfSale
        totalRooms
        totalUnits
        unitNumber
        view
        waterfront
        yearBuilt
        zip
      }
    }
  }
`;

export default ALL_IFORM_GRID;
