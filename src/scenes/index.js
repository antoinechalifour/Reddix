import React from 'react'
import { Route } from 'react-router-dom'
import DrawerLayout from 'Components/DrawerLayout'
import ThemeProvider from 'Components/ThemeProvider'
import { IfLoggedIn, IfAnonymous } from 'Components/FeatureToggle'
import Home from './Home'
import Subreddit from './Subreddit'
import Me from './Me'
import Login from './Login'
import User from './User'

const App = () => (
  <ThemeProvider>
    <div>
      <IfAnonymous>
        {() => <Login />}
      </IfAnonymous>
      <IfLoggedIn>
        {() => (
          <DrawerLayout>
            <Route exact path='/' component={Home} />
            <Route path='/r/:r' component={Subreddit} />
            <Route exact path='/me' component={Me} />
            <Route path='/u/:username' component={User} />
          </DrawerLayout>
        )}
      </IfLoggedIn>
    </div>
  </ThemeProvider>
)

export default App
