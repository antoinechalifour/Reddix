import { combineReducers } from 'redux'
import * as actions from '../actions/prefs'

export const prefs = (state = null, action) => {
  switch (action.type) {
    case actions.RECEIVE_PREFS:
      return action.prefs

    default:
      return state
  }
}

export const api = (state = { isLoading: false }, action) => {
  switch (action.type) {
    case actions.REQUEST_PREFS:
      return {
        ...state,
        isLoading: true
      }

    case actions.RECEIVE_PREFS:
      return {
        ...state,
        isLoading: false
      }

    default:
      return state
  }
}

export default combineReducers({
  api,
  prefs
})
