import React, { Component } from 'react'
import classnames from 'classnames'
import Markdown from 'react-markdown'
import AppBarContainer from '../../containers/AppBarContainer'
import CommentsContainer from '../../containers/CommentsContainer'

const getRenderer = ({ src, alt }) => {
  const typeToRegexp = {
    video: [
      /.gifv/,
      /.mp4/
    ],
    img: [
      /.gif(?!v)/,
      /.jpg/,
      /.png/
    ]
  }
  const typeToRenderer = {
    video: () => {
      const videoSrc = [
        src.split('gifv').join('webm'),
        src.split('gifv').join('mp4')
      ]
      return (
        <video
          autoPlay
          preload
          loop
          controls
        >
          {videoSrc.map(x => <source src={x} />)}
        </video>
      )
    },
    img: () => (
      <img src={src} alt={alt} />
    ),
    default: () => (
      <div>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href={src}
        >
          {src}
        </a>
      </div>
    )
  }

  let mediaType
  Object.keys(typeToRegexp).forEach(key => {
    if (mediaType) {
      return
    }

    const regs = typeToRegexp[key]

    regs.forEach(reg => {
      if (reg.test(src)) {
        mediaType = key
      }
    })
  })

  mediaType = mediaType || 'default'
  return typeToRenderer[mediaType]()
}

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
    let media

    if (this.props.media) {
      media = {
        src: this.props.media.oembed.thumbnail_url,
        alt: this.props.media.oembed.description
      }
    } else if (this.props.url) {
      media = {
        src: this.props.url,
        alt: this.props.title
      }
    }

    if (this.props.selftext) {
      postContent = (
        <Markdown source={this.props.selftext} />
      )
      modifierClass = '--text'
    } else if (media) {
      postContent = getRenderer(media)
      modifierClass = '--media'
    }

    return (
      <div className='post'>
        <AppBarContainer r={this.props.r} />
        
        {postContent && (
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
        )}

        <CommentsContainer id={this.props.id} />
      </div>
    )
  }
}

export default Post