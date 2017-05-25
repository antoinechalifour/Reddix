import { createSelector } from 'reselect'

const arrayIntersection = (a, b) => {
  const sA = new Set(a)
  const sB = new Set(b)

  return [...sA].filter(x => sB.has(x))
}

/**------------------------------ */
// Subreddits selectors and helpers
/**------------------------------ */

/**
 * Returns the current user subscriptions
 */
export const subscriptionsSelector = state => state.subscriptions

/**
 * Maps an array of IDs to an array of Subreddits
 */
export const mapIdsToSubreddits = state => ids => ids.map(id => state.subreddits.byId[id])

/**------------------------------ */
// Posts selectors and helpers
/**------------------------------ */

/**
 * Creates a selector that returns IDs of posts of the given category
 * or an empty array if none
 * Use case: select posts "HOT" posts
 */
export const createPostsCategorySelector = category => state => state.posts.byCategory[category] || []

/**
 * Creates a selector that returns IDs of posts that belong to the given subreddit
 * or an empty array if none
 * Use case: select posts from "WEBDEV"
 */
export const createPostsSubredditSelector = subreddit => state => state.posts.bySubreddit[subreddit] || []

/**
 * Creates a selector that returns IDs of posts that belong to the
 * given subreddit AND the given category (UNION).
 * Use Case: select "HOT" posts from "WEBDEV".
 */
export const createPostsCategorySubredditSelector = (category, subreddit) => createSelector(
  createPostsCategorySelector(category),
  createPostsSubredditSelector(subreddit),
  arrayIntersection
)

/**
 * Maps an array of ids to an array of Posts
 */
export const mapIdsToPosts = state => ids => ids.map(id => state.posts.byId[id])


/**------------------------------ */
// Comments selectors and helpers
/**------------------------------ */

export const createPostCommentsSelector = postId => state => state.comments.byPost[postId] || []

export const topLevelCommentSelector = state => {
  const allIds = Object.keys(state.comments.byId)
  const children = []
  Object.keys(state.comments.replies).forEach(parent => {
    children.push(...state.comments.replies[parent])
  })

  // Iterate allIds and remove the current ID
  // if it appears as a child
  return allIds.filter(id => !children.some(childId => childId === id))
}

export const createPostTopLevelCommentSelector = postId => createSelector(
  createPostCommentsSelector(postId),
  topLevelCommentSelector,
  arrayIntersection
)

export const createCommentChildrenSelector = commentId => state => state.comments.replies[commentId] || []

export const createCommentSelector = commentId => state => state.comments.byId[commentId]

export const mapIdsToComments = state => ids => ids.map(id => state.comments.byId[id])