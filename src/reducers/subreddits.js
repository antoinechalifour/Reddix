import { combineReducers } from 'redux'
import * as actions from '../actions/subreddit'

export const byId = (state = {}, action) => {
  switch (action.type) {
    case actions.RECEIVE_SUBREDDIT:
      return {
        ...state,
        [action.subreddit.id]: action.subreddit
      }
    
    case actions.RECEIVE_SUBSCRIPTIONS:
    case actions.RECEIVE_SUBREDDITS:
      return {
        ...state,
        ...(action.subreddits.reduce((accumulator, sub) => {
          accumulator[sub.id] = sub
          return accumulator
        }, {}))
      }
    
    default:
      return state
  }
}

export default combineReducers({
  byId
})