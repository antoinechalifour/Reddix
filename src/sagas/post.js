import { call, take, put, fork } from 'redux-saga/effects'
import * as Api from '../api'
import * as PostActions from '../actions/post'

function * requestPost () {
  while (true) {
    const { r, id } = yield take(PostActions.REQUEST_POST)

    try {
      const { post, comments } = yield call(Api.fetchPost, r, id)

      yield put(PostActions.receivePost(post, comments, r))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function * root () {
  yield fork(requestPost)
}