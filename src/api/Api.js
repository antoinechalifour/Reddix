const genBasicAuth = (username, password) => `Basic ${btoa(`${username}:${password}`)}`

const UNAUTHENTICATED_URI_BASE = 'https://www.reddit.com/api/v1'
const AUTHENTICATED_URI_BASE = 'https://oauth.reddit.com'

export default class Api {
  constructor ({
    access_token,
    refresh_token,
    clientId,
    redirectUri,
    scope,
    token_type
  }) {
    this.accessToken = access_token
    this.refreshToken = refresh_token
    this.clientId = clientId
    this.redirectUri = redirectUri
    this.scope = scope
    this.token_type = token_type

    // Generate hot, new rising, ... endpoints
    this.getHot = this._generateSubredditsMethodsHOF('hot')
    this.getNew = this._generateSubredditsMethodsHOF('new')
    this.getRising = this._generateSubredditsMethodsHOF('rising')
    this.getTop = this._generateSubredditsMethodsHOF('top')
    this.getControversial = this._generateSubredditsMethodsHOF('controversial')
  }

  getMe () {
    return this._makeAuthorizedRequest('/api/v1/me')
  }

  getSubscriptions () {
    return this._makeAuthorizedRequest('/subreddits/mine/subscriber')
  }

  getSubreddit (name) {
    return this._makeAuthorizedRequest(`/r/${name}/about`)
  }

  _generateSubredditsMethodsHOF (endpoint) {
    return (name, options) => {
      let uri = ''
      if (typeof name === 'string') {
        uri += `/r/${name}`
      } else {
        options = name
      }

      uri += `/${endpoint}`

      return this._makeAuthorizedRequest(uri, options)
    }
  }

  _makeAuthorizedRequest (uri, opts = {}) {
    const headers = new Headers()
    headers.append('Authorization', `bearer ${this.accessToken}`)
    
    const options = {
      ...opts,
      headers
    }

    return fetch(`${AUTHENTICATED_URI_BASE}${uri}`, options)
      .then(response => response.json())
  }

  refresh () {
    const basic = genBasicAuth(this.clientId, '')
    const headers = new Headers()
    const form = new FormData()
    
    headers.append('Authorization', basic)
    form.append('grant_type', 'refresh_token')
    form.append('refresh_token', this.refreshToken)

    return fetch(`${UNAUTHENTICATED_URI_BASE}/api/v1/access_token`, {
      method: 'POST',
      headers,
      body: form
    })
    .then(response => response.json())
    .then(({ access_token }) => {
      if (!access_token) {
        throw new Error('Refresh failed')
      }

      this.accessToken = access_token
    })
  }

  /**
   * Generates the URL that the app will
   * open in order for the user to authorize Reddix
   */
  static getAuthUrl ({ clientId, scope, redirectUri }) {
    return (
      `${UNAUTHENTICATED_URI_BASE}/authorize` +
      `?client_id=${encodeURIComponent(clientId)}` + 
      '&response_type=code' +
      '&state=_' +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scope.join(' '))}` +
      '&duration=permanent'
    )
  }

  /**
   * Generates an API client from an authorization code.
   */
  static fromAuthCode({ code, clientId, redirectUri }) {
    const uri = `${UNAUTHENTICATED_URI_BASE}/access_token`
    const headers = new Headers()
    const form = new FormData()
    const basic = genBasicAuth(clientId, '')
    
    headers.append('Authorization', basic)
    const body = {
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri
    }

    Object.keys(body).forEach(key => {
      form.append(key, body[key])
    })

    return fetch(uri, {
      method: 'POST',
      headers,
      body: form
    })
    .then(response => response.json())
    .then(data => new Api({ ...data, clientId, redirectUri }))
  }

  static fromRefreshToken ({ refreshToken, clientId, redirectUri }) {
    const uri = `${UNAUTHENTICATED_URI_BASE}/access_token`
    const headers = new Headers()
    const form = new FormData()
    const basic = genBasicAuth(clientId, '')

    headers.append('Authorization', basic)
    form.append('grant_type', 'refresh_token')
    form.append('refresh_token', refreshToken)

    return fetch(uri, {
      method: 'POST',
      headers,
      body: form
    })
    .then(response => response.json())
    .then(data => new Api({ ...data, clientId, redirectUri }))
  }
}