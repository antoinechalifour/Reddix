export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const TOGGLE_SAVE_COMMENT = 'TOGGLE_SAVE_COMMENT'
export const TOGGLE_UPVOTE_COMMENT = 'TOGGLE_UPVOTE_COMMENT'
export const TOGGLE_DOWNVOTE_COMENT = 'TOGGLE_DOWNVOTE_COMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'

export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
})

export const toggleUpvote = id => ({
  type: TOGGLE_UPVOTE_COMMENT,
  id
})

export const toggleDownvote = id => ({
  type: TOGGLE_DOWNVOTE_COMENT,
  id
})

export const toggleSave = id => ({
  type: TOGGLE_SAVE_COMMENT,
  id
})

export const updateComment = (id, updates) => ({
  type: UPDATE_COMMENT,
  id,
  updates
})