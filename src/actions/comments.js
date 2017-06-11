export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const REQUEST_MORE_COMMENTS = 'REQUEST_MORE_COMMENTS'
export const RECEIVE_MORE_COMMENTS = 'RECEIVE_MORE_COMMENTS'
export const SEND_COMMENT = 'SEND_COMMENT'

export const receiveComments = (comments, pagination = []) => ({
  type: RECEIVE_COMMENTS,
  comments,
  pagination
})

export const updateComment = (id, updates) => ({
  type: UPDATE_COMMENT,
  id,
  updates
})

export const requestMoreComments = id => ({
  type: REQUEST_MORE_COMMENTS,
  id
})

export const receiveMoreComments = id => ({
  type: RECEIVE_MORE_COMMENTS,
  id
})

export const sendComment = (text, id) => ({
  type: SEND_COMMENT,
  id,
  text
})
