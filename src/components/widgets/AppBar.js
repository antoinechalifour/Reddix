import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as Api from '../../api'
import debounce from '../../util/debounce'

class AppBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      suggestions: []
    }

    this.onChange = debounce(this.onChange, 250).bind(this)
  }

  onChange (value) {
    if (value.length > 2) {
      Api.searchSubreddit(value)
      .then(suggestions => this.setState({ suggestions }))
    } else if (value.length === 0) {
      this.setState({ suggestions: [] })
    }
  }

  render () {
    const { r } = this.props
    const title = r
      ? `/r/${r}`
      : 'Home'
    const href = r
      ? title
      : '/'

    return (
      <div className='app-bar'>
        <div className='app-bar__title'>
          <Link to={href}>{title}</Link>
        </div>
        <div className='app-bar__search'>
          <span>/r/</span>
          <input
            placeholder='browse...'
            onChange={e => this.onChange(e.target.value)}
          />

          {this.state.suggestions.length > 0 && (
            <div className="app-bar__suggestions">
              {this.state.suggestions.map(x => (
                <Link
                  key={x}
                  to={`/r/${x}`}
                  onClick={() => this.setState({ suggestions: [] })}
                >
                  {x}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default AppBar