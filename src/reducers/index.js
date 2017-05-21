import { combineReducers } from 'redux'
import auth from './auth'
import posts from './posts'
import subreddits from './subreddits'
import comments from './comments'
import ui from './ui'

const reducer = combineReducers({
  auth,
  posts,
  subreddits,
  comments,
  ui
})

export default reducer