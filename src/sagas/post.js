import { call, take, put, fork, select } from 'redux-saga/effects'
import * as actions from '../actions/post'

function * requestPost () {
  while (true) {
    const { r, id } = yield take(actions.REQUEST_POST)
    // const client = yield select(state => state.client)

    // const _post = client.getSubmission(id)
    // const post = yield _post.fetch()

    // yield put(actions.receivePost(post))

    // try {
    //   const client = yield select(state => state.client)
    //   const sub = yield client.getSubreddit(r)
    //   console.log({ sub })
    //   const { post, comments } = yield call(Api.fetchPost, r, id)

    //   yield put(actions.receivePost(post, comments, r))
    // } catch (err) {
    //   console.log(err)
    // }
  }
}

function * requestPosts () {
  while (true) {
    const { subreddit, from, after } = yield take(actions.REQUEST_POSTS)
    const r = yield select(state => state.r)

    const [up, ...rest] = from
    // Converts "hot" to "getHot"
    const fetchMethod = `get${up.toUpperCase()}${rest.join('')}`
    const _posts = yield r[fetchMethod](subreddit, { after: `t3_${after}` })
    const posts = _posts.data.children.map(x => x.data)

    yield put(actions.receivePosts(posts, from))
  }
}

export default function * root () {
  yield fork(requestPost)
  yield fork(requestPosts)
}