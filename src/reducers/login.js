import { combineReducers } from 'redux'
import * as actions from '../actions/auth'

export const api = (state = { isLoading: false }, action) => {
  switch (action.type) {
    case actions.LOGIN:
      return {
        ...state,
        isLoading: true
      }
    
    case actions.LOGIN_FAILED:
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}

export default combineReducers({
  api
})