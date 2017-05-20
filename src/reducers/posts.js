import { combineReducers } from 'redux'
import {
  RECEIVE_POSTS
} from '../actions/subreddit'
import {
  REQUEST_POST,
  RECEIVE_POST
} from '../actions/post'

const byId = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return action.posts.reduce((accumulator, post) => {
        accumulator[post.id] = post
        return accumulator
      }, {})

    case RECEIVE_POST:
      return {
        ...state,
        [action.post.id]: action.post
      }

    default:
      return state
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return [...new Set([
        ...state,
        ...action.posts.map(x => x.id)
      ])]
    
    case RECEIVE_POST:
      return [...new Set([
        ...state,
        action.post.id
      ])]
    
    default:
      return state
  }
}

const api = (state = { isLoading: false }, action) => {
  switch (action.type) {
    case REQUEST_POST:
      return {
        ...state,
        isLoading: true
      }
    
    case RECEIVE_POST:
      return {
        ...state,
        isLoading: false
      }
    
    default:
      return state
  }
}

export default combineReducers({
  byId,
  allIds,
  api
})