import { combineReducers } from 'redux'
import posts from './posts'
import subreddits from './subreddits'
import comments from './comments'
import ui from './ui'

const reducer = combineReducers({
  posts,
  subreddits,
  comments,
  ui
})

export default reducer