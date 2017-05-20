import React, { PureComponent } from 'react'
import AppBar from '../widgets/AppBar'
import PostItem from './PostItem'

class Subreddit extends PureComponent {
  componentDidMount () {
    this.props.actions.requestPosts({
      subreddit: this.props.r
    })
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.r !== nextProps.r) {
      this.props.actions.requestPosts({
        subreddit: nextProps.r
      })
    }
  }

  render () {
    return (
      <div className='subreddit'>
        <AppBar r={this.props.r} />
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