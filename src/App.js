import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Home from './components/pages/Home'
import Subreddit from './components/pages/Subreddit'
import FakeProgressContainer from './containers/FakeProgressContainer'
import DrawerLayoutContainer from './containers/DrawerLayoutContainer'
import LoginContainer from './containers/LoginContainer'
import { IfLoggedIn, IfAnonymous } from './containers/FeatureToggle'

const App = () => (
  <Router>
    <div>
      <IfAnonymous>
        {() => <LoginContainer />}
      </IfAnonymous>
      <IfLoggedIn>
        {() => (
          <DrawerLayoutContainer>
            <FakeProgressContainer />
            <Route
              exact
              path="/"
              component={Home}
            />

            <Route path='/r/:r' component={Subreddit} />
          </DrawerLayoutContainer>
        )}
      </IfLoggedIn>
    </div>
  </Router>
)

export default App