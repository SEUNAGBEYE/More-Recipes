/**
 * @description - Convert word to Sentence Case
 *
 * @param {Sting} value
 *
 * @returns {String} Sentence case of value
 */
const convertToSentenceCase = (value) => {
  const firstChar = value.charAt(0).toUpperCase();
  const valueWithoutFirstLetter = value.slice(1).toLowerCase();
  value = `${firstChar}${valueWithoutFirstLetter}`;
  return value;
};

export default convertToSentenceCase;
