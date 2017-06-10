import * as actions from '../actions/users'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case actions.RECEIVE_USER:
      return {
        ...state,
        [action.username]: {
          user: action.user,
          overview: action.overview,
          comments: action.comments,
          submissions: action.submissions
        }
      }

    default:
      return state
  }
}

export default reducer
