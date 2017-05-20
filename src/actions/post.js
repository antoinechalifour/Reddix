export const REQUEST_POST = 'REQUEST_POST'
export const RECEIVE_POST = 'RECEIVE_POST'

export const requestPost = (r, id) => ({
  type: REQUEST_POST,
  r,
  id
})

export const receivePost = (post, comments, sub) => ({
  type: RECEIVE_POST,
  sub,
  post,
  comments
})