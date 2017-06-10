export const REQUEST_USER = 'REQUEST_USER'
export const RECEIVE_USER = 'RECEIVE_USER'

export const requestUser = username => ({
  type: REQUEST_USER,
  username
})

export const receiveUser = (username, user, overview, submissions, comments) => ({
  type: RECEIVE_USER,
  username,
  user,
  overview,
  submissions,
  comments
})
