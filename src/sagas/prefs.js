import { fork, take, put, select } from 'redux-saga/effects'
import * as actions from '../actions/prefs'

function * requestPrefs () {
  while (true) {
    yield take(actions.REQUEST_PREFS)
    const r = yield select(state => state.r)
    const prefs = yield r.getPrefs()

    yield put(actions.receivePrefs(prefs))
  }
}

export default function * root () {
  yield fork (requestPrefs)
}