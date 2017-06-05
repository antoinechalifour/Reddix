import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import MdMenu from 'react-icons/lib/md/menu'
import debounce from 'Util/debounce'
import {
  PRIMARY_COLOR,
  BOX_SHADOW_1,
  BOX_SHADOW_2,
  FONT_FAMILY_SECONDARY,
  FONT_COLOR_LIGHT
} from 'Util/constants'

const Outer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 12px;

  color: #fff;
  background: ${PRIMARY_COLOR};
  box-shadow: ${BOX_SHADOW_1};

  font-family: ${FONT_FAMILY_SECONDARY};

  a {
    text-decoration: none;
    color: inherit;
  }
`

const MenuIcon = styled(MdMenu)`
  margin-right: 12px;
  font-size: 1.2rem;
`

const Search = styled.div`
  position: relative;
  padding: 4px 12px;
  border-bottom: 2px solid rgba(255, 255, 255, .3);

  input {
    border: none;
    outline: none;
    box-sizing: border-box;

    background: none;
    color: inherit;

    font-family: inherit;
    font-size: inherit;
  }
`

const Suggestions = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  z-index: 10;

  background: #fff;
  color: ${FONT_COLOR_LIGHT};
  box-shadow: ${BOX_SHADOW_2};
  
  font-size: 13px;
  padding: 12px;

  a {
    display: block;
    text-decoration: none;
    color: inherit;
  }
`

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
      this.props.api.searchSubreddits(value)
        .then(results => results.subreddits.map(x => x.name))
        .then(suggestions => this.setState({ suggestions }))
    } else if (value.length === 0) {
      this.setState({ suggestions: [] })
    }
  }

  render () {
    const { r } = this.props
    const title = r
      ? `/r/${r}`
      : 'Frontpage'
    const href = r
      ? title
      : '/'

    return (
      <Outer className={this.props.className}>
        <div>
          <MenuIcon onClick={() => this.props.actions.toggleDrawer()} />
          <Link to={href}>{title}</Link>
        </div>
        <Search>
          <span>/r/</span>
          <input
            placeholder='browse...'
            onChange={e => this.onChange(e.target.value)}
          />

          {this.state.suggestions.length > 0 && (
            <Suggestions>
              {this.state.suggestions.map(x => (
                <Link
                  key={x}
                  to={`/r/${x}`}
                  onClick={() => this.setState({ suggestions: [] })}
                >
                  {x}
                </Link>
              ))}
            </Suggestions>
          )}
        </Search>
      </Outer>
    )
  }
}

export default AppBar
