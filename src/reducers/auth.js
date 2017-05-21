import { LOGIN_SUCCESS } from '../actions/auth'

const authReducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.client
    
    default:
      return state
  }
}

export default authReducer