import { combineReducers } from 'redux'
import { RECEIVE_COMMENTS } from '../actions/comments'

const byId = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        ...(action.comments.reduce((acc, comment) => {
          acc[comment.id] = comment
          return acc
        }, {}))
      }
    
    default:
      return state
  }
}

const byPost = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        ...(action.comments.reduce((acc, comment) => {
          const { link_id } = comment
          // Remove the "t3_" prefix to get
          // The post id
          const postId = link_id.substr(3)

          acc[postId] = acc[postId] || []
          acc[postId].push(comment.id)
          return acc
        }, {}))
      }

    default:
      return state
  }
}

const replies = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      const newHierarchy = {}

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

export default combineReducers({
  byId,
  byPost,
  replies
})