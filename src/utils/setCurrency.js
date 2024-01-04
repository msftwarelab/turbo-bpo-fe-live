import numeral from 'numeral';
import currencyFormatter from 'currency-formatter';

export default (currency = '', number, decimalPlace = 0) => {

  let newSymbol = '';
  if (currency) {
    newSymbol = currencyFormatter.findCurrency(currency).symbol;
  }
  let newDigits = '';
  let j;
  for (j = 0; j < decimalPlace; j += 1) {
    newDigits += '0';
  }
  return newSymbol + numeral(number).format(`0,0.${newDigits}`);
};
