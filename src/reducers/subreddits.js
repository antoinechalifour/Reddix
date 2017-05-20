import { combineReducers } from 'redux'
import {
  REQUEST_POSTS,
  RECEIVE_POSTS
} from '../actions/subreddit'

const addOnlyNewPosts = (oPosts = [], nPosts) => {
  const result = [...oPosts]
  const added = result.reduce((accumulator, post) => {
    accumulator[post] = true
    return accumulator
  }, {})

  nPosts.forEach(post => {
    if (!added[post]) {
      added[post] = true
      result.push(post)
    }
  })

  return result
}

const posts = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        [action.sub]: addOnlyNewPosts(state[action.sub], action.posts.map(x => x.id))
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