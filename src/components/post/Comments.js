import React, { Component } from 'react'
import Comment from './Comment'

class Comments extends Component {
  render () {
    if (this.props.comments.length === 0) {
      // Prevent empty content to display
      // when no comments are loaded
      return null
    }
  
    return (
      <div className='post__comments'>
        {this.props.comments.map(x => (
          <Comment
            key={x.id}
            {...x}
          />
        ))}
      </div>
    )
  }
}

export default Comments