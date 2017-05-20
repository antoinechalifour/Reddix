import { combineReducers } from 'redux'
import {
  REQUEST_POSTS,
  RECEIVE_POSTS
} from '../actions/subreddit'

const posts = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        [action.sub]: action.posts.map(x => x.id)
      }
    default:
      return state
  }
}

const api = (state = { isLoading: false }, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isLoading: true
      }
    
    case RECEIVE_POSTS:
      return {
        ...state,
        isLoading: false
      }
    
    default:
      return state
  }
}

export default combineReducers({
  posts,
  api
})