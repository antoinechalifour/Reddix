export default function debounce (fn, wait) {
  let timeout
  return function () {
    const args = arguments
    const later = () => {
      timeout = null
      fn.apply(this, args)
    }

    clearTimeout(timeout)

    timeout = setTimeout(later, wait)
  }
}