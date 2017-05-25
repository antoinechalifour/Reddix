import React, { Component } from 'react'
import classnames from 'classnames'
import MdClose from 'react-icons/lib/md/close'
import { XmlEntities as Entities } from 'html-entities'

const entities = new Entities()

class RichVideo extends Component {
  constructor (props) {
    super(props)

    this.state = { width: 0 }
    this.ratio = props.height / props.width

    this.onRootRef = this.onRootRef.bind(this)
  }

  onRootRef (e) {
    if (e) {
      const { width } = e.getBoundingClientRect()
      this.setState({ width })
    }
  }

  render () {
    const isReady = this.props.width !== 0
    let content

    if (isReady) {
      let unescaped = entities.decode(this.props.content)
      const width = this.state.width
      const height = width * this.ratio

      unescaped = unescaped
        .split(`width="${this.props.width}"`)
        .join(`width="${width}"`)
        .split(`height="${this.props.height}"`)
        .join(`height="${height}"`)
      
      content = unescaped
    }
    return (
      <div
        ref={this.onRootRef}
      >
        {this.state.width !== 0 && (
          <div
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </div>
    )
  }
}

const PostModal = ({
  actions,
  show,
  post_hint,
  media_embed,
  url
}) => {
  if (!show) {
    return null
  }

  const isImage = post_hint === 'image'
  const isVideo = post_hint === 'rich:video'

  return (
    <div
      className='post-modal'
      onClick={() => actions.hideModal()}
    >
      <div
        className={classnames('post-modal__content', {
          'post-modal__content--video': isVideo
        })}
        onClick={e => {
          // Stop propagtion in order to prevent the
          // event from bubbing up and closing the
          // modal
          e.stopPropagation()
        }}
      >
        {isImage && (
          <img src={url} />
        )}
        {isVideo && (
          <RichVideo {...media_embed} />
        )}

        <MdClose
          onClick={() => actions.hideModal()}
          className='post-modal__close'
        />
      </div>
    </div>
  )
}

export default PostModal