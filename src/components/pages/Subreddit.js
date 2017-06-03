import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AppBarContainer from '../../containers/AppBarContainer'
import SubredditContainer from '../../containers/SubredditContainer'
import PostContainer from '../../containers/PostContainer'
import PostModalContainer from '../../containers/PostModalContainer'
import SubmitPostContainer from '../../containers/SubmitPostContainer'

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
        render={() => (
          <div className='page-subreddit'>
            <AppBarContainer r={r} />
            <SubredditContainer r={r} />
            <PostModalContainer />

            <Route
              path='/r/:r/submit'
              render={() => {
                return <SubmitPostContainer r={r} />
              }}
            />
          </div>
        )}
      />
    </Switch>
  )
}

export default Subreddit
