import { combineReducers } from 'redux'
import { LOGOUT } from '../actions/auth'
import auth from './auth'
import posts from './posts'
import subreddits from './subreddits'
import comments from './comments'
import me from './me'
import ui from './ui'

const reducer = combineReducers({
  auth,
  posts,
  subreddits,
  comments,
  me,
  ui
})

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined
  }

  return reducer(state, action)
}

export default rootReducer