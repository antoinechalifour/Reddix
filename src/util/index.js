export const arrayIntersection = (a, b) => {
  const bSet = new Set(b)
  return a.filter(x => bSet.has(x))
}