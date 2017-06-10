import React, { Component } from 'react'
import AppBar from 'Components/AppBar'
import { Tabs, Tab, TabList, TabPanels } from 'Components/Tabs'
import User from './components/User'
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
            <Tab>User</Tab>
            <Tab>Overview</Tab>
            <Tab>Posts</Tab>
            <Tab>Comments</Tab>
          </TabList>
          <TabPanels>
            <User {...this.props.user} />
            <Overview {...this.props.overview} />
            <Posts {...this.props.submissions} />
            <Comments {...this.props.comments} />
          </TabPanels>
        </Tabs>
      </div>
    )
  }
}

export default UserPage
