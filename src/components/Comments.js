import React, { Component } from 'react'
import CommentContainer from '../containers/CommentContainer'

class Comments extends Component {
  render () {
    if (this.props.commentIds.length === 0) {
      // Prevent empty content to display
      // when no comments are loaded
      return null
    }

    return (
      <div className='post__comments'>
        {this.props.commentIds.map(id => (
          <CommentContainer
            key={id}
            id={id}
          />
        ))}
      </div>
    )
  }
}

export default Comments
