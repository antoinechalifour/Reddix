import React, { Component } from 'react'
import PostItem from './PostItem'
import debounce from '../../util/debounce'

class PostList extends Component {
  constructor (props) {
    super(props)

    this.onScroll = debounce(this.onScroll, 350).bind(this)
  }

  componentDidMount () {
    this.props.actions.requestPosts(
      this.props.r,
      this.props.from
    )

    window.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onScroll)
  }

  onScroll () {
    if (this.props.posts.length === 0) {
      // Sub does not contain any post yet
      // so we do not need to fetch more
      return
    }
    const [lastPost] = this.props.posts.reverse()
    const scrollBottom = document.body.scrollHeight
      - document.body.scrollTop
      - window.innerHeight
    
    if (scrollBottom / window.innerHeight < 0.2) {
      this.props.actions.requestPosts(
        this.props.r,
        this.props.from,
        lastPost.id
      )
    }
  }

  render () {
    return (
      <div className='subreddit__post-list'>
        {this.props.posts.map(p => (
          <PostItem
            key={p.id}
            {...p}
          />
        ))}
      </div>
    )
  }
}

export default PostList