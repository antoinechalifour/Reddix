import React, { Component } from 'react'
import classnames from 'classnames'
import Markdown from 'react-markdown'
import { Link } from 'react-router-dom'
import MdExitToApp from 'react-icons/lib/md/exit-to-app'
import AppBarContainer from '../../containers/AppBarContainer'
import ThreadHeader from '../widgets/ThreadHeader'
import CommentsContainer from '../../containers/CommentsContainer'
import FluidIframe from '../widgets/FluidIframe'

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
    return (
      <div className='post'>
        <AppBarContainer r={this.props.r} />

        <div className="post__content">
          <div className='thing-meta'>
            <div className="thing-meta__score">{this.props.score}</div>
            <div>
              Posted by <Link to={`/u/${this.props.author}`}>{this.props.author}</Link>
            </div>
          </div>
          
          <ThreadHeader {...this.props} />
          
          {/* Only for selfs posts with texts */}
          {this.props.selftext && (
            <div className="post__body">
              <Markdown source={this.props.selftext} />
            </div>
          )}

          {/* Only for Rich:Video content */}
          {this.props.post_hint === 'rich:video' && (
            <div className='post__media'>
              <FluidIframe {...this.props.media_embed} />
            </div>
          )}
        </div>

        <CommentsContainer id={this.props.id} />
      </div>
    )
  }
}

export default Post