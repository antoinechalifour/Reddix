import React, { Component } from 'react'
import AppBar from 'Components/AppBar'
import { Tabs, Tab, TabList, TabPanels } from 'Components/Tabs'
import Overview from './components/Overview'
import Comments from './components/Comments'
import Posts from './components/Posts'

class UserPage extends Component {
  componentDidMount () {
    const { username } = this.props

    this.props.actions.requestUser(username)
  }

  render () {
    const { username } = this.props

    return (
      <div>
        <AppBar
          title={`/u/${username}`}
          href={`/u/${username}`}
        />

        <Tabs>
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Posts</Tab>
            <Tab>Comments</Tab>
          </TabList>
          <TabPanels>
            <Overview
              {...this.props.overview}
              username={username}
            />
            <Posts
              {...this.props.submissions}
              username={username}
            />
            <Comments
              {...this.props.comments}
              username={username}
            />
          </TabPanels>
        </Tabs>
      </div>
    )
  }
}

export default UserPage
