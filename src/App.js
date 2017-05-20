import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Home from './components/pages/Home'
import Subreddit from './components/pages/Subreddit'

const App = () => (
  <Router>
    <div>
      <Route
        exact
        path="/"
        component={Home}
      />

      <Route path='/r/:r' component={Subreddit} />
    </div>
  </Router>
)

export default App