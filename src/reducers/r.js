import snoowrap from 'snoowrap'
import { LOGIN_SUCCESS, LOGOUT } from '../actions/auth'

const initialState = null

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.client
    
    case LOGOUT:
      return initialState
    default:
      return state
  }
}

export default clientReducer