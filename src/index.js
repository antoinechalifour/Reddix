import './style/main.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import ConnectedRouter from './components/ConnectedRouter'
import createHistory from 'history/createBrowserHistory'
import createStore from './store'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import sagas from './sagas'

const history = createHistory()
const { store, run } = createStore(undefined, { history })

run(sagas)

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter
      history={history}
      store={store}
    >
      <App />
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'))

registerServiceWorker()
