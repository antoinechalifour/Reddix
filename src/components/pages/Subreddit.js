import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AppBarContainer from '../../containers/AppBarContainer'
import Tabs, { Tab } from '../widgets/Tabs'
import SubredditContainer from '../../containers/SubredditContainer'
import PostContainer from '../../containers/PostContainer'

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
            <Tabs>
              <Tab title='Hot'>
                <SubredditContainer r={r} />
              </Tab>
              <Tab title='New'>
                <SubredditContainer r={r} from='new' />
              </Tab>
              <Tab title='Rising'>
                <SubredditContainer r={r} from='rising' />
              </Tab>
            </Tabs>
          </div>
        )}
      />
    </Switch>
  )
}

export default Subreddit