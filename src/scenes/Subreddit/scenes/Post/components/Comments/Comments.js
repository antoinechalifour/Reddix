import React, { Component } from 'react'
import Comment from './components/Comment'

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
          <Comment
            key={id}
            id={id}
          />
        ))}
      </div>
    )
  }
}

export default Comments
