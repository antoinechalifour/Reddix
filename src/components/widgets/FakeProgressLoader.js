import React, { Component } from 'react'

class FakeProgressLoader extends Component {
  constructor (props) {
    super (props)

    this.state = { time: 0 }
  }

  componentDidMount () {
    this.interval = setInterval(() => {
      this.setState(ls => ({
        ...ls,
        time: ls.time += 75
      }))
    }, 1)
  }

  componentWillUnmount () {
    if (this.interval) (
      clearInterval(this.interval)
    )
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.show !== nextProps.show) {
      this.setState({ time: 0 })
    }
  }

  render () {
    if (!this.props.show) {
      return null
    }

    const width = Math.atan(this.state.time / 3000) / (Math.PI / 2) * 100

    return (
      <div
        style={{ width: `${width}%`}}
        className='fake-progress-loader'
      />
    )
  }
}

export default FakeProgressLoader