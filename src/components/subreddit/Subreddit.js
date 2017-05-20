import React, { PureComponent } from 'react'
import PostItem from './PostItem'

class Subreddit extends PureComponent {
  componentDidMount () {
    this.props.actions.requestPosts({
      subreddit: this.props.r,
      tag: this.props.from
    })
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.r !== nextProps.r) {
      this.props.actions.requestPosts({
        subreddit: nextProps.r,
        tag: nextProps.from
      })
    }
  }

  render () {
    return (
      <div className='subreddit'>
        <div className='subreddit__post-list'>
          {this.props.posts.map(p => (
            <PostItem
              key={p.id}
              {...p}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Subreddit