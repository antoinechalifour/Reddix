import React, { Component } from 'react'
import Markdown from 'react-markdown'
import Humanize from 'humanize-plus'
import CommentContainer from '../../containers/CommentContainer'
import { Link } from 'react-router-dom'

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
        <div className="thing-meta">
          <div className="thing-meta__score">{Humanize.compactInteger(this.props.score, 1)}</div>
          <div>
            Posted by <Link to={`/u/${this.props.author}`}>/u/{this.props.author}</Link>
          </div>
        </div>

        <div
          onClick={() => this.setState(ls => ({
            ...ls,
            showChildren: !ls.showChildren
          }))}
        >
          <Markdown source={this.props.body} />
        </div>
        <div className='thing-meta'>
          <div onClick={() => this.setState({ showReply: true })}>Reply</div>
        </div>

        {this.state.showChildren && this.props.replies.length > 0 && (
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