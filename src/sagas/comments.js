import { fork, select, take, put } from 'redux-saga/effects'
import * as actions from '../actions/comments'

function * toggleUpvote () {
  while (true) {
    const { id } = yield take(actions.TOGGLE_UPVOTE_COMMENT)
    const comment = yield select(state => state.comments.byId[id])
    const r = yield select(state => state.r)
    const prefixedId = `t1_${id}`
    const updates = {}

    if (comment.likes === 1) {
      yield r.unvote(prefixedId)
      updates.likes = 0
    } else {
      yield r.upvote(prefixedId)
      updates.likes = 1
    }

    yield put(actions.updateComment(id, updates))
  }
}

function * toggleDownvote () {
  while (true) {
    const { id } = yield take(actions.TOGGLE_DOWNVOTE_COMENT)
    const comment = yield select(state => state.comments.byId[id])
    const r = yield select(state => state.r)
    const prefixedId = `t1_${id}`
    const updates = {}

    if (comment.likes === -1) {
      yield r.unvote(prefixedId)
      updates.likes = 0
    } else {
      yield r.downvote(prefixedId)
      updates.likes = -1
    }

    yield put(actions.updateComment(id, updates))
  }
}

function * toggleSave () {
  while (true) {
    const { id } = yield take(actions.TOGGLE_SAVE_COMMENT)
    const comment = yield select(state => state.comments.byId[id])
    const r = yield select(state => state.r)
    const prefixedId = `t1_${id}`
    const updates = {}

    if (comment.saved) {
      yield r.unsave(prefixedId)
      updates.saved = false
    } else {
      yield r.save(prefixedId)
      updates.saved = true
    }

    yield put(actions.updateComment(id, updates))
  }
}

export default function * root () {
  yield fork(toggleUpvote)
  yield fork(toggleDownvote)
  yield fork(toggleSave)
}