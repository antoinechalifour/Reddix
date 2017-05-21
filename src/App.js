import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Home from './components/pages/Home'
import Subreddit from './components/pages/Subreddit'
import FakeProgressContainer from './containers/FakeProgressContainer'
import DrawerLayoutContainer from './containers/DrawerLayoutContainer'

const App = () => (
  <Router>
    <DrawerLayoutContainer>
      <FakeProgressContainer />
      <Route
        exact
        path="/"
        component={Home}
      />

      <Route path='/r/:r' component={Subreddit} />
    </DrawerLayoutContainer>
  </Router>
)

export default App