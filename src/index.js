// (1.) Style setup imports
import './reset.css'
import SourceSansPro from './fonts/SourceSansPro-Regular.ttf'
import { injectGlobal } from 'styled-components'

// (2.) Application bootstrap imports
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import ConnectedRouter from './components/ConnectedRouter'
import createStore from './store'
import App from './scenes'
import registerServiceWorker from './registerServiceWorker'
import sagas from './sagas'

// (1.) Styling setup
// Styling is implemented using styled-components.
// eslint-disable-next-line
injectGlobal`
  @font-face {
    font-family: 'SourceSansPro';
    src: url(${SourceSansPro});
  }
`

// (2.) Application bootstrap
// There are a few things we need to boostrap:
// (a.) Create the store
// (b.) Run our Sagas
// (c.) Finally render our app

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
