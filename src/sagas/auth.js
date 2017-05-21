import qs from 'querystring'
import { all, take, put, fork } from 'redux-saga/effects'
import snoowrap from 'snoowrap'
import * as AuthActions from '../actions/auth'
import * as SubredditActions from '../actions/subreddit'

const watchOauthWindow = wOauth => new Promise((resolve, reject) => {
  let interval = setInterval(() => {
    try {
      const href = wOauth.location.href
      const query = qs.parse(href)
      resolve(query.code)
      wOauth.close()
    } catch (err) {
      // Cannot read when on reddit oauth page
    }
  }, 2000)
})

function * loginFlow () {
  while (true) {
    yield take(AuthActions.LOGIN)
    console.log('Loggin in...')
    const clientId = 'GDObwCGoh5qWdg'
    const scope = [
      'subscribe',
      'vote',
      'mysubreddits',
      'submit',
      'save',
      'read',
      'identity',
      'account',
      'edit',
      'history'
    ]
    const authUrl = snoowrap.getAuthUrl({
      clientId,
      scope,
      redirectUri: 'http://localhost:3000/oauth'
    })

    const wOauth = window.open(authUrl, "Authorize Reddix", "width=800, height=600")
  
    const code = yield watchOauthWindow(wOauth)

    if (!code) {
      yield put(AuthActions.LOGIN_FAILED)
      return
    }

    const r = yield snoowrap.fromAuthCode({
      code,
      clientId,
      redirectUri: 'http://localhost:3000/oauth'
    })

    let [me, subscriptions] = yield Promise.all([
      r.getMe(),
      r.getSubscriptions()
    ])

    yield all([
      put(AuthActions.loginSuccess(r)),
      put(SubredditActions.receiveSubreddits(subscriptions))
    ])
  }
}

export default function * root () {
  yield fork(loginFlow)
}