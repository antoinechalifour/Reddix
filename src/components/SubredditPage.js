import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SubredditContainer from '../containers/SubredditContainer'
import PostContainer from '../containers/PostContainer'

const Subreddit = ({ match }) => {
  const { r } = match.params

  return (
    <Switch>
      <Route
        path='/r/:r/comments/:id'
        render={props => (
          <PostContainer
            r={r}
            id={props.match.params.id}
          />
        )}
      />

      <Route
        path='/r/:r'
        render={() => <SubredditContainer r={r} />}
      />
    </Switch>
  )
}

export default Subreddit
