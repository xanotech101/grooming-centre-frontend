/**
 * Capitalize only the `first letter` of the string.
 * @param {string} string
 *
 * @returns string
 */
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Capitalize `all words` of a string.
 * @param {string} string
 *
 * @returns string
 */
export function capitalizeWords(string) {
  return string.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
}
