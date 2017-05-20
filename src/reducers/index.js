import { combineReducers } from 'redux'
import posts from './posts'
import subreddits from './subreddits'
import comments from './comments'

const reducer = combineReducers({
  posts,
  subreddits,
  comments
})

export default reducer