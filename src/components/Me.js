import React, { Component } from 'react'

class Me extends Component {
  componentDidMount () {
    this.props.actions.requestPrefs()
  }

  render () {
    return (
      <div>
        <pre>
          {JSON.stringify(this.props.me, null, 2)}
        </pre>
        <pre>
          {JSON.stringify(this.props.prefs, null, 2)}
        </pre>
      </div>
    )
  }
}

export default Me
