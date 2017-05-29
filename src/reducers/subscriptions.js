import * as actions from '../actions/subreddit'

const subscriptionsReducer = (state = [], action) => {
  switch (action.type) {
    case actions.RECEIVE_SUBSCRIPTIONS:
      return action.subreddits.map(x => x.id)
    
    case actions.ADD_SUBSCRIPTION:
      return [...state, action.id]

    case actions.REMOVE_SUBSCRIPTION:
      return state.filter(id => id !== action.id)

    default:
      return state
  }
}

export default subscriptionsReducer