

/**
 * Check if value is number (null/undefined not valid)
 * @param x
 */
export const isNum = (x) => !isNaN(parseInt(x));

/**
 * Make sure always get value as array
 * @param x
 */
export const ensureArray = (x, ignoreUndefined = true) =>
  Array.isArray(x) || (x === undefined && ignoreUndefined) ? x : [x];


/**
 * Return distinct/unique values from array
 */
export const uniqueArray = (arr) =>
  arr.filter((elem, pos) =>
    arr.indexOf(elem) == pos
  );

/**
 * Trim if string
 */
export const trim = (s) => typeof s === 'string' ? s.trim() : s;


/**
 * Make a word singular or plural depending on counter
 */
export const singural = (counter: number, outputSingular, outputPlural) =>
  counter === 1 ? outputSingular : outputPlural;
