import { call, take, put, fork, select } from 'redux-saga/effects'
import * as actions from '../actions/post'
import * as commentsActions from '../actions/comments'

/**
 * For a given comment, flattens its children and returns it and its
 * children as a flat array
 */
const flattenComments = thing => {
  const comment = thing.data
  const replies = comment.replies
  const flattened = [comment]

  if (replies && replies.kind === 'Listing') {
    for (let child of replies.data.children) {
      flattened.push(...flattenComments(child))
    }
  }

  return flattened
}

function * requestPost () {
  while (true) {
    const { r: subreddit, id } = yield take(actions.REQUEST_POST)
    const r = yield select(state => state.r)

    const [_post, _comments] = yield r.getPost(id, subreddit)
    const post = _post.data.children[0].data
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
    const allComments = []

    for (let comment of comments) {
      allComments.push(...flattenComments(comment))
    }

    yield put(actions.receivePost(post))
    yield put(commentsActions.receiveComments(allComments))
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

export default function * root () {
  yield fork(requestPost)
  yield fork(requestPosts)
  yield fork(watchToggleSave)
}