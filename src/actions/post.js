export const REQUEST_POST = 'REQUEST_POST'
export const RECEIVE_POST = 'RECEIVE_POST'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

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