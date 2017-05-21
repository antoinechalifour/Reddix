import { combineReducers } from 'redux'
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

export default reducer