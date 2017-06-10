import { fork, select, take, put } from 'redux-saga/effects'
import { goBack } from 'react-router-redux'
import * as actions from '../actions/comments'
import { flattenComments } from '../api/helpers'

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

function * requestMoreComments () {
  while (true) {
    const { id } = yield take(actions.REQUEST_MORE_COMMENTS)
    const comment = yield select(state => state.comments.byId[id])
    const pagination = yield select(state => state.comments.pagination)
    const r = yield select(state => state.r)
    const children = pagination[id]

    const { json } = yield r.getMoreChildren(comment.link_id, children)
    const allComments = []

    for (const comment of json.data.things) {
      allComments.push(...flattenComments(comment))
    }

    const userComments = allComments
    .filter(x => x.link_id)
    .map(x => ({
      ...x,
      likes: x.likes ? 1 : 0
    }))
    const paginationComments = allComments
    .filter(x => !x.link_id)

    yield put(actions.receiveMoreComments(id))
    yield put(actions.receiveComments(userComments, paginationComments))
  }
}

function * sendComment () {
  while (true) {
    const { id, text } = yield take(actions.SEND_COMMENT)
    const r = yield select(state => state.r)

    yield r.postComment(text, id)

    yield put(goBack())
  }
}

export default function * root () {
  yield fork(toggleUpvote)
  yield fork(toggleDownvote)
  yield fork(toggleSave)
  yield fork(requestMoreComments)
  yield fork(sendComment)
}
