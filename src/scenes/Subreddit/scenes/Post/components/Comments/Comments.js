import React, { Component } from 'react'
import styled from 'styled-components'
import { Card, CardContent } from 'Components/Card'
import Comment from './components/Comment'
// import { BOX_SHADOW_1, RESPONSIVE_BREAKPOINT } from 'Util/constants'

const Container = styled(Card)`
  margin-top: 12px;
`

class Comments extends Component {
  render () {
    if (this.props.commentIds.length === 0) {
      // Prevent empty content to display
      // when no comments are loaded
      return null
    }

    return (
      <div>
        {this.props.commentIds.map(id => (
          <Container key={id}>
            <CardContent>
              <Comment
                id={id}
                depth={0}
              />
            </CardContent>
          </Container>
          ))}
      </div>
    )
  }
}

export default Comments
