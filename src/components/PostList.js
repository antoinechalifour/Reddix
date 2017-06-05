import React, { Component } from 'react'
import styled from 'styled-components'
import PostItemContainer from '../containers/PostItemContainer'
import debounce from '../util/debounce'

const Outer = styled.div`
  > div + div {
    margin-top: 8px;
  }
`

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

  componentWillReceiveProps (nextProps) {
    if (this.props.r !== nextProps.r) {
      this.props.actions.requestPosts(
        nextProps.r,
        nextProps.from
      )
    }
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
    const scrollBottom = document.body.scrollHeight -
      document.body.scrollTop -
      window.innerHeight

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
      <Outer>
        {this.props.posts.map(p => (
          <PostItemContainer
            key={p.id}
            {...p}
          />
        ))}
      </Outer>
    )
  }
}

export default PostList
