import { take, put, fork, select } from 'redux-saga/effects'
import * as actions from '../actions/subreddit'

function * requestSubreddit () {
  while (true) {
    const { name } = yield take(actions.REQUEST_SUBREDDIT)
    const r = yield select(state => state.r)
    const { data: subreddit } = yield r.getSubreddit(name)

    yield put(actions.receiveSubreddit(subreddit))
  }
}

function * toggleSubscription () {
  while (true) {
    const { id } = yield take(actions.TOGGLE_SUBSCRIPTION)
    const r = yield select(state => state.r)
    const subreddit = yield select(state => state.subreddits.byId[id])
    const subscriptions = yield select(state => state.subscriptions)

    const isSubscribed = subscriptions.indexOf(id) !== -1

    if (isSubscribed) {
      yield r.unsub(subreddit.name)
      yield put(actions.removeSubscription(id))
    } else {
      yield r.sub(subreddit.name)
      yield put(actions.addSubscription(id))
    }
  }
}

export default function * root () {
  yield fork(requestSubreddit)
  yield fork(toggleSubscription)
}
