import { call, take, put, fork, select } from 'redux-saga/effects'
import * as actions from '../actions/subreddit'

function * requestSubreddit () {
  while (true) {
    const { name } = yield take(actions.REQUEST_SUBREDDIT)
    const r = yield select(state => state.r)
    const { data: subreddit } = yield r.getSubreddit(name)

    yield put(actions.receiveSubreddit(subreddit))
  }
}

export default function * root () {
  yield fork(requestSubreddit)
}