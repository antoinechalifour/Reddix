import { combineReducers } from 'redux'
import { RECEIVE_POST } from '../actions/post'

const byId = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POST:
      const commentsToAdd = action.post.comments.reduce((accumulator, comment) => {
        accumulator[comment.id] = comment
        return accumulator
      }, {})
      return {
        ...state,
        ...commentsToAdd
      }
    
    default:
      return state
  }
}

const byPost = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POST:
      return {
        ...state,
        [action.post.id]: action.post.comments.map(x => x.id)
      }
    
    default:
      return state
  }
}

export default combineReducers({
  byId,
  byPost
})