import { fork } from 'redux-saga/effects'
import watchSubreddits from './subreddits'
import watchPosts from './post'
import watchAuth from './auth'

export default function * root () {
  yield fork(watchSubreddits)
  yield fork(watchPosts)
  yield fork(watchAuth)
}