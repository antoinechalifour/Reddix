import { take, select, put, fork } from 'redux-saga/effects'
import * as actions from '../actions/things'
import * as PostActions from '../actions/post'
import * as CommentActions from '../actions/comments'
import { thingIdFromFullname } from 'Util/things'

const handleAction = ({
  action,
  findThingByFullname,
  handleThing
}) => function * () {
  while (true) {
    const { fullname } = yield take(action)
    const thing = yield select(findThingByFullname(fullname))

    if (thing) {
      yield handleThing(thing)
    }
  }
}

const findCommentByFullname = fullname => state => {
  const id = thingIdFromFullname(fullname)

  return state.comments.byId[id]
}

const findPostByFullname = fullname => state => {
  const id = thingIdFromFullname(fullname)

  return state.posts.byId[id]
}

const handleCommentUpvote = handleAction({
  action: actions.TOGGLE_UPVOTE,
  findThingByFullname: findCommentByFullname,
  handleThing: function * (thing) {
    const r = yield select(state => state.r)
    const updates = {}

    if (thing.likes === 1) {
      yield r.unvote(thing.name)
      updates.likes = 0
    } else {
      yield r.upvote(thing.name)
      updates.likes = 1
    }

    yield put(CommentActions.updateComment(thing.id, updates))
  }
})

const handleCommentDownvote = handleAction({
  action: actions.TOGGLE_DOWNVOTE,
  findThingByFullname: findCommentByFullname,
  handleThing: function * (thing) {
    const r = yield select(state => state.r)
    const updates = {}

    if (thing.likes === -1) {
      yield r.unvote(thing.name)
      updates.likes = 0
    } else {
      yield r.upvote(thing.name)
      updates.likes = -1
    }

    yield put(CommentActions.updateComment(thing.id, updates))
  }
})

const handleCommentSave = handleAction({
  action: actions.TOGGLE_SAVE,
  findThingByFullname: findCommentByFullname,
  handleThing: function * (thing) {
    const r = yield select(state => state.r)
    const updates = {}

    if (thing.saved) {
      yield r.unsave(thing.name)
      updates.saved = false
    } else {
      yield r.save(thing.name)
      updates.saved = true
    }
    yield put(CommentActions.updateComment(thing.id, updates))
  }
})

const handlePostUpvote = handleAction({
  action: actions.TOGGLE_UPVOTE,
  findThingByFullname: findPostByFullname,
  handleThing: function * (thing) {
    const r = yield select(state => state.r)
    const updates = {}

    if (thing.likes === 1) {
      yield r.unvote(thing.name)
      updates.likes = 0
    } else {
      yield r.upvote(thing.name)
      updates.likes = 1
    }

    yield put(PostActions.updatePost(thing.id, updates))
  }
})

const handlePostDownvote = handleAction({
  action: actions.TOGGLE_DOWNVOTE,
  findThingByFullname: findPostByFullname,
  handleThing: function * (thing) {
    const r = yield select(state => state.r)
    const updates = {}

    if (thing.likes === -1) {
      yield r.unvote(thing.name)
      updates.likes = 0
    } else {
      yield r.downvote(thing.name)
      updates.likes = -1
    }

    yield put(PostActions.updatePost(thing.id, updates))
  }
})

const handlePostSave = handleAction({
  action: actions.TOGGLE_SAVE,
  findThingByFullname: findPostByFullname,
  handleThing: function * (thing) {
    const r = yield select(state => state.r)
    const updates = {}

    if (thing.saved) {
      yield r.unsave(thing.name)
      updates.saved = false
    } else {
      yield r.save(thing.name)
      updates.saved = true
    }

    yield put(PostActions.updatePost(thing.id, updates))
  }
})

export default function * root () {
  yield fork(handleCommentUpvote)
  yield fork(handleCommentDownvote)
  yield fork(handleCommentSave)
  yield fork(handlePostUpvote)
  yield fork(handlePostDownvote)
  yield fork(handlePostSave)
}
