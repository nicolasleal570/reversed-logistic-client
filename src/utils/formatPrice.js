export const roundDecimals = (number, decimals = 2) => {
  const factor = 10 ** decimals;
  const secureFactor = 1000000;
  const preRound = Math.round(number * factor * secureFactor);
  return Math.floor(preRound / secureFactor) / factor;
};

export const formatPrice = (numeric) => {
  numeric = roundDecimals(numeric);
  const stringValue = `${numeric}`;
  const fractions = stringValue.split('.');
  if (!fractions[1]) {
    fractions[1] = '00';
  } else if (fractions[1].length === 1) {
    fractions[1] = `${fractions[1]}0`;
  }
  let aux = [...fractions[0]];
  aux = aux.reverse();
  for (let index = 3; index < aux.length; index += 3) {
    aux.splice(index, 0, '.');
    index += 1;
  }
  aux = aux.reverse();
  fractions[0] = aux.join('');
  return fractions.join(',');
};
