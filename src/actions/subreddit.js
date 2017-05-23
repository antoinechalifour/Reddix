export const REQUEST_SUBREDDIT = 'REQUEST_SUBREDDIT'
export const RECEIVE_SUBREDDIT = 'RECEIVE_SUBREDDIT'
export const RECEIVE_SUBREDDITS = 'RECEIVE_SUBREDDITS'
export const RECEIVE_SUBSCRIPTIONS = 'RECEIVE_SUBSCRIPTIONS'

export const requestSubreddit = name => ({
  type: REQUEST_SUBREDDIT,
  name
})

export const receiveSubreddit = subreddit => ({
  type: RECEIVE_SUBREDDIT,
  subreddit
})

export const receiveSubreddits = subreddits => ({
  type: RECEIVE_SUBREDDITS,
  subreddits
})

export const receiveSubscriptions = subreddits => ({
  type: RECEIVE_SUBSCRIPTIONS,
  subreddits
})