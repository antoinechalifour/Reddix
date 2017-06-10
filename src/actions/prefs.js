export const REQUEST_PREFS = 'REQUEST_PREFS'
export const RECEIVE_PREFS = 'RECEIVE_PREFS'

export const requestPrefs = () => ({
  type: REQUEST_PREFS
})

export const receivePrefs = prefs => ({
  type: RECEIVE_PREFS,
  prefs
})
