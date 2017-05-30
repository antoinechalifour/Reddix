import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'
import reducer from '../reducers'
import sagas from '../sagas'

// Use Chrome redux extension if it does exist
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose

const configureStore = (initialState, { history }) => {
  // Create and store the saga middleware in order to 
  // return and run it later
  const sagaMiddleware = createSagaMiddleware(sagas)

  const enhancer = composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware
    )
  )
  
  const store = createStore(reducer, initialState, enhancer)

  return { store, run: sagaMiddleware.run }
}

export default configureStore