import { RECEIVE_ME } from '../actions/me'

const meReducer = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_ME:
      return action.me

    default:
      return state
  }
}

export default meReducer
