import { fork } from 'redux-saga/effects'
import watchSubreddits from './subreddits'
import watchPosts from './post'

export default function * root () {
  yield fork(watchSubreddits)
  yield fork(watchPosts)
}