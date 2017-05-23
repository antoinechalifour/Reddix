import { combineReducers } from 'redux'
import * as actions from '../actions/post'
import mergeDeep from '../util/mergeDeep'

const byId = (state = {}, action) => {
  switch (action.type) {
    case actions.RECEIVE_POSTS:
      return {
        ...state,
        ...action.posts.reduce((accumulator, post) => {
          accumulator[post.id] = post
          return accumulator
        }, {})
      }

    case actions.RECEIVE_POST:
      return {
        ...state,
        [action.post.id]: action.post
      }

    default:
      return state
  }
}

const byCategory = (state = {}, action) => {
  switch (action.type) {
    case actions.RECEIVE_POSTS:
      const oldPosts = state[action.from] || []
      const newPosts = action.posts.map(x => x.id)

      return {
        ...state,
        [action.from]: [...new Set([...oldPosts, ...newPosts])]
      }
    
    default:
      return state
  }
}

const bySubreddit = (state = {}, action) => {
  switch (action.type) {
    case actions.RECEIVE_POSTS:
      const newEntries = action.posts.reduce((acc, post) => {
        acc[post.subreddit] = acc[post.subreddit] || []
        acc[post.subreddit].push(post.id)

        return acc
      }, {})
      return mergeDeep(state, newEntries)

    default:
      return state
  }
}

const api = (state = { isLoading: false }, action) => {
  switch (action.type) {
    case actions.REQUEST_POST:
    case actions.RECEIVE_POSTS:
      return {
        ...state,
        isLoading: true
      }
    
    case actions.RECEIVE_POSTS:
    case actions.RECEIVE_POST:
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
  byCategory,
  bySubreddit,
  api
})