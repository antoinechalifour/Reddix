import { fork, take, put, select } from 'redux-saga/effects'
import * as actions from 'Actions/users'

const formatListingData = listing => ({
  pagination: {
    before: listing.data.before,
    after: listing.data.after
  },
  data: listing.data.children.map(x => x.data)
})

function * requestUser () {
  while (true) {
    const { username } = yield take(actions.REQUEST_USER)
    const r = yield select(state => state.r)

    const [user, overview, submissions, comments] = yield Promise.all([
      r.getUser(username),
      r.getUserOverview(username),
      r.getUserSubmissions(username),
      r.getUserComments(username)
    ])

    yield put(actions.receiveUser(
      username,
      user.data,
      formatListingData(overview),
     formatListingData(submissions),
     formatListingData(comments)
    ))
  }
}

export default function * root () {
  yield fork(requestUser)
}
