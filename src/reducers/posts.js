import { combineReducers } from 'redux'
import * as actions from '../actions/post'

export const byId = (state = {}, action) => {
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

    case actions.UPDATE_POST:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          ...action.updates
        }
      }

    default:
      return state
  }
}

export const byCategory = (state = {}, action) => {
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

export const bySubreddit = (state = {}, action) => {
  switch (action.type) {
    case actions.RECEIVE_POSTS:
      const nextState = { ...state }
      const newEntries = action.posts.reduce((acc, post) => {
        acc[post.subreddit] = acc[post.subreddit] || []
        acc[post.subreddit].push(post.id)

        return acc
      }, {})

      Object.keys(newEntries).forEach(subreddit => {
        const oldPosts = state[subreddit] || []
        nextState[subreddit] = [...new Set([
          ...oldPosts,
          ...newEntries[subreddit]
        ])]
      })
      return nextState

    default:
      return state
  }
}

export const api = (state = { isLoading: false }, action) => {
  switch (action.type) {
    case actions.REQUEST_POST:
    case actions.REQUEST_POSTS:
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
