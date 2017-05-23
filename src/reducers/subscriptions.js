import * as actions from '../actions/subreddit'

const subscriptionsReducer = (state = [], action) => {
  switch (action.type) {
    case actions.RECEIVE_SUBSCRIPTIONS:
      return action.subreddits.map(x => x.id)
    
    default:
      return state
  }
}

export default subscriptionsReducer