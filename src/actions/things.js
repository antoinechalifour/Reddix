export const TOGGLE_UPVOTE = 'TOGGLE_UPVOTE'
export const TOGGLE_DOWNVOTE = 'TOGGLE_DOWNVOTE'
export const TOGGLE_SAVE = 'TOGGLE_SAVE'

export const toggleUpvote = fullname => ({
  type: TOGGLE_UPVOTE,
  fullname
})

export const toggleDownvote = fullname => ({
  type: TOGGLE_DOWNVOTE,
  fullname
})

export const toggleSave = fullname => ({
  type: TOGGLE_SAVE,
  fullname
})
