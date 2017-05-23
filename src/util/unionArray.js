export default function unionArray (arr1, arr2) {
  console.log(arr1, arr2)
  return [...new Set([...arr1, ...arr2])]
}