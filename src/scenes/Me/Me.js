import React, { Component } from 'react'
import AppBar from 'Components/AppBar'
import { Tabs, TabList, Tab, TabPanels } from 'Components/Tabs'

class Me extends Component {
  componentDidMount () {
    this.props.actions.requestPrefs()
  }

  render () {
    return (
      <div>
        <Tabs>
          <AppBar
            title='Me'
            href='/me'
          />
          <TabList>
            <Tab>Activity</Tab>
            <Tab>Preferences</Tab>
          </TabList>
          <TabPanels>
            <div>
              <pre>
                {JSON.stringify(this.props.me, null, 2)}
              </pre>
            </div>
            <div>
              <pre>
                {JSON.stringify(this.props.prefs, null, 2)}
              </pre>
            </div>
          </TabPanels>
        </Tabs>
      </div>
    )
  }
}

export default Me
