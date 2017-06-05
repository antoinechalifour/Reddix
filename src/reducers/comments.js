import { combineReducers } from 'redux'
import * as actions from '../actions/comments'

export const byId = (state = {}, action) => {
  switch (action.type) {
    case actions.RECEIVE_COMMENTS:
      return {
        ...state,
        ...(action.comments.reduce((acc, comment) => {
          delete comment.replies
          acc[comment.id] = comment
          return acc
        }, {}))
      }

    case actions.UPDATE_COMMENT:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          ...action.updates
        }
      }

    default:
      return state
  }
}

export const byPost = (state = {}, action) => {
  switch (action.type) {
    case actions.RECEIVE_COMMENTS:
      const nextState = { ...state }
      const newEntries = action.comments.reduce((acc, comment) => {
        const { link_id } = comment
        // Remove the "t3_" prefix to get
        // The post id
        const postId = link_id.substr(3)

        acc[postId] = acc[postId] || []
        acc[postId].push(comment.id)
        return acc
      }, {})

      Object.keys(newEntries).forEach(postId => {
        const oldComments = state[postId] || []
        nextState[postId] = [...new Set([
          ...oldComments,
          ...newEntries[postId]
        ])]
      })

      return nextState

    default:
      return state
  }
}

export const replies = (state = {}, action) => {
  switch (action.type) {
    case actions.RECEIVE_COMMENTS:
      const newHierarchy = { ...state }

      // Iterate the comments to build
      // the hierarchy
      action.comments.forEach(comment => {
        let { link_id, parent_id, id } = comment

        // When parent_id is equal to link_id,
        // Then the comment is a "top level" comment
        if (parent_id && parent_id !== link_id) {
          parent_id = parent_id.substr(3)
          newHierarchy[parent_id] = newHierarchy[parent_id] || []
          newHierarchy[parent_id].push(id)
        }
      })

      return {
        ...state,
        ...newHierarchy
      }

    default:
      return state
  }
}

export const pagination = (state = {}, action) => {
  switch (action.type) {
    case actions.RECEIVE_COMMENTS:
      return {
        ...state,
        ...action.pagination.reduce((acc, page) => {
          const { parent_id: parentId } = page
          acc[parentId.substr(3)] = page.children
          return acc
        }, {})
      }

    case actions.RECEIVE_MORE_COMMENTS:
      const nextState = { ...state }
      delete nextState[action.id]
      return nextState

    default:
      return state
  }
}

export default combineReducers({
  byId,
  byPost,
  replies,
  pagination
})
