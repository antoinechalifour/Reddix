import React, { PureComponent } from 'react'
import PostItem from './PostItem'

class Subreddit extends PureComponent {
  constructor (props) {
    super(props)

    this.onScroll = this.onScroll.bind(this)
  }

  componentDidMount () {
    this.props.actions.requestPosts({
      subreddit: this.props.r,
      tag: this.props.from
    })

    window.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onScroll)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.r !== nextProps.r) {
      this.props.actions.requestPosts({
        subreddit: nextProps.r,
        tag: nextProps.from
      })
    }
  }

  onScroll () {
    const scrollBottom = document.body.scrollHeight - document.body.scrollTop - window.innerHeight

    if (scrollBottom / window.innerHeight < 0.1) {
      if (this.props.posts[this.props.posts.length - 1]) {
        this.props.actions.requestPosts({
          subreddit: this.props.r,
          tag: this.props.from,
          query: {
            after: `t3_${this.props.posts[this.props.posts.length - 1].id}`
          }
        })
      }
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