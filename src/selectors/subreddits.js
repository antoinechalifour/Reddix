/** ------------------------------ */
// Subreddits selectors and helpers
/** ------------------------------ */

/**
 * Returns the current user subscriptions
 */
export const subscriptionsSelector = state => state.subscriptions

/**
 * Maps an array of IDs to an array of Subreddits
 */
export const mapIdsToSubreddits = state => ids => ids.map(id => state.subreddits.byId[id])
