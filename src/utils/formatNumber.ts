const formatNumber = (number: string) => {
  const stringToNumber = parseFloat(number);
  return stringToNumber.toFixed(2);
};

export default formatNumber;
