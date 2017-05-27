import React, { Component } from 'react'
import classnames from 'classnames'
import MdClose from 'react-icons/lib/md/close'
import FluidIframe from './FluidIframe'

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
          <FluidIframe {...media_embed} />
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