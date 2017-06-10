import React, { Component } from 'react'
import { Router } from 'react-router-dom'

const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'

class ConnectedRouter extends Component {
  constructor (props) {
    super(props)

    this.handleLocationChange = this.handleLocationChange.bind(this)
  }

  componentWillMount () {
    const { history } = this.props
    this.unsubscribe = history.listen(this.handleLocationChange)
    this.handleLocationChange(history.location)
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  handleLocationChange (location) {
    this.props.store.dispatch({
      type: LOCATION_CHANGE,
      payload: location
    })
  }

  render () {
    return <Router
      onUpdate={() => window.scrollTo(0, 0)}
      {...this.props}
    />
  }
}

export default ConnectedRouter
