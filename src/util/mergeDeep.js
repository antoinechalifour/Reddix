const mergeDeep = (destination, source) => {
  let merged = { ...destination }

  Object.keys(source).forEach(key => {
    // If the destination also has the source then
    // we need to go deeper ¯\_(ツ)_/¯

    if (destination[key]) {
      merged[key] = mergeDeep(destination[key], source[key])
    } else {
      merged[key] = source
    }
  })

  return merged
}

export default mergeDeep