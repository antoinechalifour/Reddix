import React, { Component } from 'react'
import Markdown from 'react-markdown'
import Humanize from 'humanize-plus'
import CommentContainer from '../../containers/CommentContainer'

class Comment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showChildren: true
    }
  }
  render () {
    return (
      <div className='comment'>
        <div className="comment__header">
          <div className="comment__score">{Humanize.compactInteger(this.props.score, 1)}</div>
          <div className="comment__author">/u/{this.props.author}</div>
        </div>

        <div
          className="comment__body"
          onClick={() => this.setState(ls => ({
            ...ls,
            showChildren: !ls.showChildren
          }))}
        >
          <Markdown source={this.props.body} />
        </div>

        {this.state.showChildren && (
          <div className="comment__replies">
            {this.props.replies.map(id => (
              <CommentContainer
                key={id}
                id={id}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default Comment