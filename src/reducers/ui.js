import {
  TOGGLE_DRAWER,
  HIDE_MODAL
} from '../actions/ui'
import { DISPLAY_POST_MODAL } from '../actions/post'

const initialState = {
  drawer: 'closed',
  modal: null
}

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return {
        ...state,
        drawer: state.drawer === 'closed' ? 'open' : 'closed'
      }
    
    case DISPLAY_POST_MODAL:
      return {
        ...state,
        modal: action.modal
      }
    
    case HIDE_MODAL:
      return {
        ...state,
        modal: null
      }
    
    default:
      return state
  }
}

export default uiReducer