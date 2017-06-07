import React, { Component } from 'react'
import styled from 'styled-components'
import Comment from './components/Comment'
import { BOX_SHADOW_1, RESPONSIVE_BREAKPOINT } from 'Util/constants'

const Outer = styled.div`
  max-width: ${RESPONSIVE_BREAKPOINT};
  box-sizing: border-box;
  margin: 24px auto;
  padding: 16px;
  border-radius: 4px;
  overflow: hidden;

  background: #fff;
  box-shadow: ${BOX_SHADOW_1};
`

class Comments extends Component {
  render () {
    if (this.props.commentIds.length === 0) {
      // Prevent empty content to display
      // when no comments are loaded
      return null
    }

    return (
      <Outer>
        {this.props.commentIds.map(id => (
          <Comment
            key={id}
            id={id}
          />
        ))}
      </Outer>
    )
  }
}

export default Comments
