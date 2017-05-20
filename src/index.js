import './style/main.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createStore from './store'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import sagas from './sagas'

const { store, run } = createStore()

run(sagas)

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'))

registerServiceWorker()
