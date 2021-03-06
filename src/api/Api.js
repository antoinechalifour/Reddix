import qs from 'querystring'

const genBasicAuth = (username, password) => `Basic ${window.btoa(`${username}:${password}`)}`

const UNAUTHENTICATED_URI_BASE = 'https://www.reddit.com/api/v1'
const AUTHENTICATED_URI_BASE = 'https://oauth.reddit.com'

export default class Api {
  constructor ({
    access_token: accessToken,
    refresh_token: refreshToken,
    clientId,
    redirectUri,
    scope,
    token_type: tokenType
  }) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    this.clientId = clientId
    this.redirectUri = redirectUri
    this.scope = scope
    this.token_type = tokenType

    // Generate hot, new rising, ... endpoints
    this.getHot = this._generateSubredditsMethodsHOF('hot')
    this.getNew = this._generateSubredditsMethodsHOF('new')
    this.getRising = this._generateSubredditsMethodsHOF('rising')
    this.getTop = this._generateSubredditsMethodsHOF('top')
    this.getControversial = this._generateSubredditsMethodsHOF('controversial')

    // Generate fav endpoints
    this.save = this._generateSaveMethodsHOF('save')
    this.unsave = this._generateSaveMethodsHOF('unsave')

    // Generate vote endpoints
    this.upvote = this._generateVoteMethodsHOF(1)
    this.downvote = this._generateVoteMethodsHOF(-1)
    this.unvote = this._generateVoteMethodsHOF(0)

    // Generate subscription endpoints
    this.sub = this._generateSubscriptionMethodsHOF('sub')
    this.unsub = this._generateSubscriptionMethodsHOF('unsub')

    // Generate user endpoints
    this.getUser = this._generateUserMethodsHOF('about')
    this.getUserOverview = this._generateUserMethodsHOF('overview')
    this.getUserSubmissions = this._generateUserMethodsHOF('submitted')
    this.getUserComments = this._generateUserMethodsHOF('comments')
    this.getUserUpvotes = this._generateUserMethodsHOF('upvoted')
    this.getUserDownvotes = this._generateUserMethodsHOF('downvoted')
    this.getUserSaves = this._generateUserMethodsHOF('saved')
  }

  getMe () {
    return this._makeAuthorizedRequest('/api/v1/me')
  }

  getPrefs () {
    return this._makeAuthorizedRequest('/api/v1/me/prefs')
  }

  getSubscriptions (options = {}) {
    const query = qs.stringify(options)
    return this._makeAuthorizedRequest(`/subreddits/mine/subscriber?${query}`)
  }

  getSubreddit (name) {
    return this._makeAuthorizedRequest(`/r/${name}/about`)
  }

  getPost (id, subreddit) {
    let uri = ''

    if (subreddit) {
      uri += `/r/${subreddit}`
    }

    uri += `/comments/${id}`

    return this._makeAuthorizedRequest(uri)
      .then(data => {
        // Quick trick: change post.like to the vote
        // direction (-1, 0 or 1)
        const isLiked = data[0].data.children[0].likes
        let dir = 0

        if (isLiked) {
          dir = 1
        }

        data[0].data.children[0].likes = dir

        return data
      })
  }

  searchSubreddits (query, { nsfw = true } = {}) {
    return this._makeAuthorizedRequest(`/api/search_subreddits?query=${query}`, {
      method: 'POST',
      body: JSON.stringify({ include_over_18: nsfw })
    })
  }

  post (kind, data) {
    let inputs

    if (kind === 'link') {
      if (!data.url) {
        throw new Error('"data.url" is expected when submitting a "link"')
      }

      const { text, ...rest } = data
      inputs = rest
    } else if (kind === 'self') {
      if (!data.text) {
        throw new Error('"data.text" is expected when submitting a "self text')
      }

      const { url, ...rest } = data
      inputs = rest
    }

    inputs.api_type = 'json'
    inputs.kind = kind

    const form = new window.FormData()

    Object.keys(inputs).forEach(key => {
      form.append(key, inputs[key])
    })

    return this._makeAuthorizedRequest('/api/submit', {
      method: 'POST',
      body: form
    })
  }

  postComment (text, thingId) {
    const form = new window.FormData()

    form.append('api_type', 'json')
    form.append('text', text)
    form.append('thing_id', thingId)

    return this._makeAuthorizedRequest('/api/comment', {
      method: 'POST',
      body: form
    })
  }

  getMoreChildren (id, children) {
    const search = qs.stringify({
      link_id: id,
      children: children.join(','),
      api_type: 'json',
      sort: 'confidence'
    })

    return this._makeAuthorizedRequest(`/api/morechildren.json?${search}`, {
      method: 'GET'
    })
  }

  _generateSubscriptionMethodsHOF (action) {
    return id => {
      const form = new window.FormData()
      form.append('action', action)
      form.append('sr', id)

      return this._makeAuthorizedRequest('/api/subscribe', {
        method: 'POST',
        body: form
      })
    }
  }

  _generateSaveMethodsHOF (endpoint) {
    return id => {
      const form = new window.FormData()
      form.append('id', id)

      return this._makeAuthorizedRequest(`/api/${endpoint}`, {
        method: 'POST',
        body: form
      })
    }
  }

  _generateVoteMethodsHOF (direction) {
    return id => {
      const form = new window.FormData()
      form.append('dir', direction)
      form.append('id', id)

      return this._makeAuthorizedRequest('/api/vote', {
        method: 'POST',
        body: form
      })
    }
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

      if (options.after) {
        uri += `?after=${options.after}`
      }

      const opts = { ...options }
      delete opts.after

      return this._makeAuthorizedRequest(uri, opts)
        .then(response => {
          // Quick trick: change post.like to the vote
          // direction (-1, 0 or 1)
          response.data.children.forEach(child => {
            const isLiked = child.data.likes
            let dir = 0

            if (isLiked) {
              dir = 1
            }

            child.data.likes = dir
          })

          return response
        })
    }
  }

  _generateUserMethodsHOF (endpoint) {
    return (username, options) => {
      const uri = `/user/${username}/${endpoint}`

      return this._makeAuthorizedRequest(uri, options)
    }
  }

  _makeAuthorizedRequest (uri, opts = {}) {
    const headers = new window.Headers()
    headers.append('Authorization', `bearer ${this.accessToken}`)

    const options = {
      ...opts,
      headers
    }

    return window.fetch(`${AUTHENTICATED_URI_BASE}${uri}`, options)
      .then(response => response.json())
  }

  refresh () {
    const basic = genBasicAuth(this.clientId, '')
    const headers = new window.Headers()
    const form = new window.FormData()

    headers.append('Authorization', basic)
    form.append('grant_type', 'refresh_token')
    form.append('refresh_token', this.refreshToken)

    return window.fetch(`${UNAUTHENTICATED_URI_BASE}/api/v1/access_token`, {
      method: 'POST',
      headers,
      body: form
    })
    .then(response => response.json())
    .then(({ access_token: accessToken }) => {
      if (!accessToken) {
        throw new Error('Refresh failed')
      }

      this.accessToken = accessToken
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
  static fromAuthCode ({ code, clientId, redirectUri }) {
    const uri = `${UNAUTHENTICATED_URI_BASE}/access_token`
    const headers = new window.Headers()
    const form = new window.FormData()
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

    return window.fetch(uri, {
      method: 'POST',
      headers,
      body: form
    })
    .then(response => response.json())
    .then(data => new Api({ ...data, clientId, redirectUri }))
  }

  static fromRefreshToken ({ refreshToken, clientId, redirectUri }) {
    const uri = `${UNAUTHENTICATED_URI_BASE}/access_token`
    const headers = new window.Headers()
    const form = new window.FormData()
    const basic = genBasicAuth(clientId, '')

    headers.append('Authorization', basic)
    form.append('grant_type', 'refresh_token')
    form.append('refresh_token', refreshToken)

    return window.fetch(uri, {
      method: 'POST',
      headers,
      body: form
    })
    .then(response => response.json())
    .then(data => new Api({ ...data, clientId, redirectUri }))
  }
}
