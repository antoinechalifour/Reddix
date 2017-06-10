import { combineReducers } from 'redux'
import { routerMiddleware as router } from 'react-router-redux'
import { LOGOUT } from '../actions/auth'
import comments from './comments'
import login from './login'
import me from './me'
import posts from './posts'
import prefs from './prefs'
import r from './r'
import subreddits from './subreddits'
import subscriptions from './subscriptions'
import ui from './ui'

const reducer = combineReducers({
  comments,
  login,
  me,
  posts,
  prefs,
  r,
  router,
  subreddits,
  subscriptions,
  ui
})

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined
  }

  return reducer(state, action)
}

export default rootReducer
