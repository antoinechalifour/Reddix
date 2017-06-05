import './reset.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { injectGlobal } from 'styled-components'
import Merriweather from './fonts/Merriweather-Regular.ttf'
import Raleway from './fonts/Raleway-Medium.ttf'
import ConnectedRouter from './components/ConnectedRouter'
import createStore from './store'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import sagas from './sagas'

// eslint-disable-next-line
injectGlobal`
  @font-face {
    font-family: 'Merriweather';
    src: url(${Merriweather});
  }

  @font-face {
    font-family: 'Raleway';
    src: url(${Raleway});
  }

  body {
    font-size: 16px;
    color: #555f61;
    background: #f7f7f9;
    line-height: 1.7;
    font-family: 'Merriweather', sans-serif;
  }
`

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
