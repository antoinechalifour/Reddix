export const REQUEST_POST = 'REQUEST_POST'
export const RECEIVE_POST = 'RECEIVE_POST'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const TOGGLE_SAVE = 'TOGGLE_SAVE'
export const TOGGLE_UPVOTE = 'TOGGLE_UPVOTE'
export const TOGGLE_DOWNVOTE = 'TOGGLE_DOWNVOTE'
export const UPDATE_POST = 'UPDATE_POST'
export const DISPLAY_POST_MODAL = 'DISPLAY_POST_MODAL'
export const SUBMIT_POST = 'SUBMIT_POST'

export const requestPost = (r, id) => ({
  type: REQUEST_POST,
  r,
  id
})

export const receivePost = post => ({
  type: RECEIVE_POST,
  post
})

export const requestPosts = (subreddit, from, after) => {
  return {
    type: REQUEST_POSTS,
    subreddit,
    from,
    after
  }
}

export const receivePosts = (posts, from) => ({
  type: RECEIVE_POSTS,
  posts,
  from
})

export const toggleSave = id => ({
  type: TOGGLE_SAVE,
  id
})

export const toggleUpvote = id => ({
  type: TOGGLE_UPVOTE,
  id
})

export const toggleDownvote = id => ({
  type: TOGGLE_DOWNVOTE,
  id
})

export const updatePost = (id, updates) => ({
  type: UPDATE_POST,
  id,
  updates
})

export const displayModal = id => ({
  type: DISPLAY_POST_MODAL,
  modal: { id, kind: 'post' }
})

export const submitPost = (kind, subreddit, payload) => ({
  type: SUBMIT_POST,
  kind,
  subreddit,
  ...payload
})
