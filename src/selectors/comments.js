import { createSelector } from 'reselect'
import { arrayIntersection } from '../util'

/** ------------------------------ */
// Comments selectors and helpers
/** ------------------------------ */

/**
 * Returns a function that returns all comments linked
 * to the provided postId
 */
export const postCommentsSelectorFactory = postId => state => state.comments.byPost[postId] || []

/**
 * Returns a list of top level comments (i.e. comments without
 * parents)
 */
export const rootCommentSelector = state => {
  const allIds = Object.keys(state.comments.byId)
  const children = []
  Object.keys(state.comments.replies).forEach(parent => {
    children.push(...state.comments.replies[parent])
  })

  // Iterate allIds and remove the current ID
  // if it appears as a child
  return allIds.filter(id => !children.some(childId => childId === id))
}

/**
 * Returns the top level comments for the provided post.
 */
export const postRootCommentSelectorFactory = postId => createSelector(
  postCommentsSelectorFactory(postId),
  rootCommentSelector,
  arrayIntersection
)

export const commentChildrenSelectorFactory = commentId => state => state.comments.replies[commentId] || []

export const commentSelectorFactory = commentId => state => state.comments.byId[commentId]

export const commentMoreSelectorFactory = commentId => state => state.comments.pagination[commentId]

export const mapIdsToComments = state => (ids = []) => ids.map(id => state.comments.byId[id])
