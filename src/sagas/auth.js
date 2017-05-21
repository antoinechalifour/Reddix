import qs from 'querystring'
import { all, take, put, fork, select } from 'redux-saga/effects'
import snoowrap from 'snoowrap'
import * as AuthActions from '../actions/auth'
import * as SubredditActions from '../actions/subreddit'
import * as MeActions from '../actions/me'

const REFRESH_TOKEN_KEY = 'REDDIX::refresh_token'

// TMP CLIENT ID FOR DEV PURPOSES
const CLIENT_ID = 'GDObwCGoh5qWdg'

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

function * setUp (r) {
  let [me, subscriptions] = yield Promise.all([
    r.getMe(),
    r.getSubscriptions()
  ])

  me = me.toJSON()

  yield all([
    put(AuthActions.loginSuccess(r)),
    put(SubredditActions.receiveSubreddits(subscriptions)),
    put(MeActions.receiveMe(me))
  ])
}

function * loginFromLocalStorage () {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)

  if (refreshToken) {
    const r = new snoowrap({
      userAgent: navigator.userAgent,
      clientId: CLIENT_ID,
      clientSecret: '',
      refreshToken
    })

    yield setUp(r)
  }
}

function * loginFlow () {
  yield loginFromLocalStorage()

  while (true) {
    yield take(AuthActions.LOGIN)
    console.log('Loggin in...')
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
      clientId: CLIENT_ID,
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
      clientId: CLIENT_ID,
      redirectUri: 'http://localhost:3000/oauth'
    })

    const { refreshToken } = r

    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)

    yield setUp(r)
  }
}

function * logout () {
  while (true) {
    // When the user wishes to logout
    yield take(AuthActions.LOGOUT_REQUEST)

    // 1. Revoke the refresh token
    const r = yield select(state => state.auth)
    yield r.revokeRefreshToken()

    // 2. Remove the refresh token from the locale storage
    localStorage.removeItem(REFRESH_TOKEN_KEY)

    // 3. Reset the app (see root reducer)
    yield put(AuthActions.logout())
  }
}

export default function * root () {
  yield fork(loginFlow)
  yield fork(logout)
}