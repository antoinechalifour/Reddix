import React, { Component } from 'react'

class InfiniteProgressWrapper extends Component {
  constructor (props) {
    super(props)

    this.state = { time: 0 }
  }

  componentDidMount () {
    this.interval = setInterval(() => {
      this.setState({ time: this.state.time + 20})
    }, 1)
  }

  render () {
    // Formula from https://blog.teamweek.com/2015/08/using-maths-to-fake-progress-bars-for-fun-and-profit/
    const width = Math.atan(this.state.time / 3000) / (Math.PI / 2) * 100

    return (
      <div style={{ width: `${width}%`}}>
        {this.props.children}
      </div>
    )
  }
}

export default InfiniteProgressWrapper