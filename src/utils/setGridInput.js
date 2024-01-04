import compares from 'constants/compInputOptions';

export default (compare = '', iformGrid = {}) => {
  const gridInput = {};
  gridInput[`txt${compare}MLSNumber`] = `${iformGrid.mlsNumber || ''}`;
  gridInput[`txt${compare}Address`] = `${iformGrid.address || ''}`;
  gridInput[`txt${compare}City`] = `${iformGrid.city || ''}`;
  gridInput[`txt${compare}Zip`] = `${iformGrid.zip || ''}`;
  gridInput[`txt${compare}OriginalListDate`] = `${iformGrid.originalListDate}`;
  gridInput[`txt${compare}CurrentListDate`] = `${iformGrid.listDate || ''}`;
  if (
    ![compares[3].compare, compares[4].compare, compares[5].compare].includes(
      compare
    )
  ) {
    gridInput[`txt${compare}SaleDate`] = `${iformGrid.saleDate || ''}`;
    gridInput[`txt${compare}SalePrice`] = `${
      iformGrid.salePrice
        ? parseFloat(iformGrid.salePrice.replace(/[^0-9.-]+/g, ''))
        : ''
    }`;
  }
  gridInput[`txt${compare}YearBuilt`] = `${iformGrid.yearBuilt || ''}`;
  gridInput[`txt${compare}Bedrooms`] = `${iformGrid.bedrooms || ''}`;
  gridInput[`txt${compare}FullBaths`] = `${iformGrid.bathrooms || ''}`;
  gridInput[`txt${compare}HalfBaths`] = `${iformGrid.halfBaths || ''}`;
  gridInput[`txt${compare}SquareFeet`] = `${iformGrid.squareFootage.replace(
    /[^0-9.-]+/g,
    ''
  ) || ''}`;
  gridInput[`cmb${compare}Garage`] = `${iformGrid.garage || ''}`;
  gridInput[`txt${compare}Subdivision`] = `${iformGrid.subdivision || ''}`;
  gridInput[`cmb${compare}Pool`] = iformGrid.pool ? 'Yes' : 'No';
  gridInput[`txt${compare}MLSComments`] = `${iformGrid.mlsComments || ''}`;
  gridInput[`txt${compare}ListPrice`] = `${
    iformGrid.listPrice
      ? parseFloat(iformGrid.listPrice.replace(/[^0-9.-]+/g, ''))
      : ''
  }`;
  gridInput[`cmb${compare}Fireplace`] = `${iformGrid.firePlace || ''}`;
  gridInput[`txt${compare}DOM`] = `${
    iformGrid.daysOnMarket
      ? parseFloat(iformGrid.daysOnMarket.replace(/[^0-9.-]+/g, ''))
      : ''
  }`;

  return gridInput;
};
