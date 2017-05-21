import { TOGGLE_DRAWER } from '../actions/ui'

const initialState = {
  drawer: 'closed'
}

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return {
        ...state,
        drawer: state.drawer === 'closed' ? 'open' : 'closed'
      }
    
    default:
      return state
  }
}

export default uiReducer