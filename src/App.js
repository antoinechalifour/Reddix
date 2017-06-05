import React from 'react'
import { Route } from 'react-router-dom'
import Home from './components/HomePage'
import Subreddit from './components/SubredditPage'
import Me from './components/MePage'
import DrawerLayoutContainer from './containers/DrawerLayoutContainer'
import LoginContainer from './containers/LoginContainer'
import { IfLoggedIn, IfAnonymous } from './containers/FeatureToggle'

const App = () => (
  <div>
    <IfAnonymous>
      {() => <LoginContainer />}
    </IfAnonymous>
    <IfLoggedIn>
      {() => (
        <DrawerLayoutContainer>
          <Route exact path='/' component={Home} />
          <Route path='/r/:r' component={Subreddit} />
          <Route exact path='/me' component={Me} />
        </DrawerLayoutContainer>
      )}
    </IfLoggedIn>
  </div>
)

export default App
