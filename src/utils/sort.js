/**
 * sorts by the index field
 * @param {*} arrayKey
 * @param {*} field
 * @returns {Array}
 */
export const sortByIndexField = (array, field) =>
  array
    ? [...array].sort((a, b) => {
        if (a[field] > b[field]) return 1;
        if (a[field] <= b[field]) return -1;
        return -1;
      })
    : [];
