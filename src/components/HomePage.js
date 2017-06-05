import React from 'react'
import SubredditContainer from '../containers/SubredditContainer'
import AppBarContainer from '../containers/AppBarContainer'

const Home = () => (
  <div>
    <AppBarContainer />
    <SubredditContainer r='FrontPage' />
  </div>
)

export default Home
