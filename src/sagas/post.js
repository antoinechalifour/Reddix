import { take, put, fork, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as actions from '../actions/post'
import * as commentsActions from '../actions/comments'
import { flattenComments } from '../api/helpers'

function * requestPost () {
  while (true) {
    const { r: subreddit, id } = yield take(actions.REQUEST_POST)
    const r = yield select(state => state.r)

    const [_post, _comments] = yield r.getPost(id, subreddit)
    const post = _post.data.children[0].data

    // Hack to convert boolean likes to 1 or 0
    post.likes = post.likes ? 1 : 0

    const comments = _comments.data.children

    // Each post comments has a deep nested structure:
    // - comments
    //   - replies[]
    //     -replies[]
    // - ... repeat
    // We actually want to store our comments
    // as a flat structure with an object
    // indicating the hierarchy, so we first need
    // to flatten this structure
    let allComments = []

    for (let comment of comments) {
      allComments.push(...flattenComments(comment))
    }

    // Quick trick
    // Replaces likes: null || true by 0 || 1 for the Api
    const userComments = allComments
    .filter(x => x.link_id)
    .map(x => ({
      ...x,
      likes: x.likes ? 1 : 0
    }))
    const paginationComments = allComments
    .filter(x => !x.link_id)

    yield put(actions.receivePost(post))
    yield put(commentsActions.receiveComments(userComments, paginationComments))
  }
}

function * requestPosts () {
  while (true) {
    const { subreddit, from, after } = yield take(actions.REQUEST_POSTS)
    const r = yield select(state => state.r)

    const [up, ...rest] = from
    // Converts "hot" to "getHot"
    const fetchMethod = `get${up.toUpperCase()}${rest.join('')}`

    const options = {}

    if (after) {
      options.after = `t3_${after}`
    }

    const _posts = yield r[fetchMethod](subreddit, options)
    const posts = _posts.data.children.map(x => x.data)

    yield put(actions.receivePosts(posts, from))
  }
}

function * watchToggleSave () {
  while (true) {
    const { id } = yield take(actions.TOGGLE_SAVE)
    const { saved } = yield select(state => state.posts.byId[id])
    const r = yield select(state => state.r)

    // Save / unsave category requires the ID prefix
    const prefixedId = `t3_${id}`

    if (saved) {
      yield r.unsave(prefixedId)
      yield put(actions.updatePost(id, { saved: false }))
    } else {
      yield r.save(prefixedId)
      yield put(actions.updatePost(id, { saved: true }))
    }
  }
}

function * watchToggleUpvote () {
  while (true) {
    const { id } = yield take(actions.TOGGLE_UPVOTE)
    const { likes } = yield select(state => state.posts.byId[id])
    const r = yield select(state => state.r)
    const prefixedId = `t3_${id}`
    const updates = {}

    if (likes === 1) {
      yield r.unvote(prefixedId)
      updates.likes = 0
    } else {
      yield r.upvote(prefixedId)
      updates.likes = 1
    }

    yield put(actions.updatePost(id, updates))
  }
}

function * watchToggleDownvote () {
  while (true) {
    const { id } = yield take(actions.TOGGLE_DOWNVOTE)
    const { likes } = yield select(state => state.posts.byId[id])
    const r = yield select(state => state.r)
    const prefixedId = `t3_${id}`
    const updates = {}

    if (likes === -1) {
      yield r.unvote(prefixedId)
      updates.likes = 0
    } else {
      yield r.downvote(prefixedId)
      updates.likes = -1
    }

    yield put(actions.updatePost(id, updates))
  }
}

function * watchSubmitPost () {
  while (true) {
    const action = yield take(actions.SUBMIT_POST)
    const r = yield select(state => state.r)
    const { kind, subreddit } = action

    const kindToFields = {
      self: ['title', 'text'],
      link: ['title', 'url']
    }
    const data = { sr: subreddit }

    kindToFields[kind].forEach(key => {
      data[key] = action[key]
    })

    const { json } = yield r.post(kind, data)
    const { data: response, errors } = json

    if (errors.length === 0) {
      yield put(push(`/r/${subreddit}/comments/${response.id}`))
    }
  }
}

export default function * root () {
  yield fork(requestPost)
  yield fork(requestPosts)
  yield fork(watchToggleSave)
  yield fork(watchToggleUpvote)
  yield fork(watchToggleDownvote)
  yield fork(watchSubmitPost)
}
