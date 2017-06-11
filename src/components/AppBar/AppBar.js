import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import MdMenu from 'react-icons/lib/md/menu'
import debounce from 'Util/debounce'
import {
  BOX_SHADOW_1,
  BOX_SHADOW_2
} from 'Util/constants'

const Outer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 12px;

  color: #fff;
  background: ${props => props.theme.colors.primary};
  box-shadow: ${BOX_SHADOW_1};

  a {
    text-decoration: none;
    color: inherit;
  }
`

const MenuIcon = styled(MdMenu)`
  margin-right: 12px;
  font-size: 1.2rem;
`

const Title = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
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

  }

  :placeholder {
    color: inherit;
  }
`

const Suggestions = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  z-index: 10;

  background: #fff;
  box-shadow: ${BOX_SHADOW_2};
  
  padding: 12px;

  a {
    display: block;
    text-decoration: none;
    color: ${props => props.theme.colors.text};
  }
`

class AppBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      suggestions: []
    }

    this.onChange = debounce(this.onChange, 250).bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
  }

  onChange (value) {
    if (value.length > 2) {
      this.props.api.searchSubreddits(value)
        .then(results => results.subreddits.map(x => x.name))
        .then(suggestions => [value, ...suggestions])
        .then(suggestions => this.setState({ suggestions }))
    } else if (value.length === 0) {
      this.setState({ suggestions: [] })
    }
  }

  onKeyUp (e) {
    if (e.keyCode === 13) {
      const [sub] = this.state.suggestions

      this.props.actions.push(`/r/${sub}`)
      this.setState({ suggestions: [] })
    }
  }

  render () {
    const { r } = this.props
    const title = r
      ? `/r/${r}`
      : this.props.title
    const href = r
      ? title
      : this.props.href

    return (
      <Outer className={this.props.className}>
        <Title>
          <MenuIcon onClick={() => this.props.actions.toggleDrawer()} />
          <Link to={href}>{title}</Link>
        </Title>
        <Search>
          <span>/r/</span>
          <input
            placeholder='browse...'
            onChange={e => this.onChange(e.target.value)}
            onKeyUp={this.onKeyUp}
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
