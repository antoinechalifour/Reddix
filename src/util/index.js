/**
 * Returns shared items betweens the arguments.
 * Only work on primitive types.
 *
 * @param {array} a
 * @param {array} b
 */
export const arrayIntersection = (a = [], b = []) => {
  const bSet = new Set(b)
  return a.filter(x => bSet.has(x));
}
