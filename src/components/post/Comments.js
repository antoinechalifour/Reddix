import React, { Component } from 'react'
import Comment from './Comment'

class Comments extends Component {
  render () {
    return (
      <div>
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