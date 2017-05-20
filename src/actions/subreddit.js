export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const requestPosts = ({ subreddit, tag, query }) => {
  return {
    type: REQUEST_POSTS,
    subreddit,
    tag,
    query
  }
}

export const receivePosts = (posts, sub = 'all') => ({
  type: RECEIVE_POSTS,
  sub,
  posts
})