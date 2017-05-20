import React, { Component } from 'react'
import classnames from 'classnames'
import AppBar from '../widgets/AppBar'
import CommentsContainer from '../../containers/CommentsContainer'

class Post extends Component {
  componentDidMount () {
    this.props.actions.requestPost(
      this.props.r,
      this.props.id
    )
  }

  render () {
    let postContent = ''
    let modifierClass = ''

    if (this.props.selftext) {
      postContent = this.props.selftext
      modifierClass = '--text'
    } else if (this.props.url) {
      postContent = (
        <a href={this.props.url}>
          {this.props.url}
        </a>
      )
      modifierClass = '--link'
    }

    return (
      <div className='post'>
        <AppBar r={this.props.r} />
        
        <div className='post__content'>
          <div className="post__header">
            <div className="post__score">{this.props.score}</div>
            <div className="post__author">/u/{this.props.author}</div>
          </div>

          <div className="post__title">{this.props.title}</div>

          <div className={classnames('post__body', `post__body${modifierClass}`)}>
            {postContent}
          </div>
        </div>
        <div className="post__comments">
          <CommentsContainer id={this.props.id} />
        </div>
      </div>
    )
  }
}

export default Post