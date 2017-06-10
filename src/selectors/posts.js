import { createSelector } from 'reselect'
import { arrayIntersection } from '../util'

/** ------------------------------ */
// Posts selectors and helpers
/** ------------------------------ */

/**
 * Creates a selector that returns IDs of posts of the given category
 * or an empty array if none
 * Use case: select posts "HOT" posts
 */
export const categorySelectorFactory = category => state => state.posts.byCategory[category] || []

/**
 * Creates a selector that returns IDs of posts that belong to the given subreddit
 * or an empty array if none
 * Use case: select posts from "WEBDEV"
 */
export const subredditSelectorFactory = subreddit => state => state.posts.bySubreddit[subreddit] || []

/**
 * Creates a selector that returns IDs of posts that belong to the
 * given subreddit AND the given category (UNION).
 * Use Case: select "HOT" posts from "WEBDEV".
 */
export const categorySubredditSelectorFactory = (category, subreddit) => createSelector(
  categorySelectorFactory(category),
  subredditSelectorFactory(subreddit),
  arrayIntersection
)

/**
 * Maps an array of ids to an array of Posts
 */
export const mapIdsToPosts = state => ids => ids.map(id => state.posts.byId[id])
