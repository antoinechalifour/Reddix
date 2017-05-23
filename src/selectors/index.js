import { createSelector } from 'reselect'

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
  (cPosts, sPosts) => [...new Set([...cPosts, ...sPosts])]
)

/**
 * Maps an array of ids to an array of Posts
 */
export const mapIdsToPosts = state => ids => ids.map(id => state.posts.byId[id])