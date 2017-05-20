import { RECEIVE_POSTS } from '../actions/subreddit'

const subreddits = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        [action.sub]: action.posts.map(x => x.id)
      }
    default:
      return state
  }
}

export default subreddits