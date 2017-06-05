import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Subreddit from './SubredditContainer'
import Post from './scenes/Post'

const Page = ({ match }) => {
  const { r } = match.params

  return (
    <Switch>
      <Route
        path='/r/:r/comments/:id'
        render={props => (
          <Post
            r={r}
            id={props.match.params.id}
          />
        )}
      />

      <Route
        path='/r/:r'
        render={() => <Subreddit r={r} />}
      />
    </Switch>
  )
}

export default Page
