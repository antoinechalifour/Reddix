import { fork } from 'redux-saga/effects'
import auth from './auth'
import comments from './comments'
import posts from './post'
import prefs from './prefs'
import subreddits from './subreddits'
import things from './things'
import users from './users'

export default function * root () {
  yield fork(auth)
  yield fork(comments)
  yield fork(posts)
  yield fork(prefs)
  yield fork(subreddits)
  yield fork(things)
  yield fork(users)
}
