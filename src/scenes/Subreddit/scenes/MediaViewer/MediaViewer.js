import React from 'react'
import styled from 'styled-components'
import MdClose from 'react-icons/lib/md/close'
import FluidIframe from 'Components/FluidIframe'
import { BOX_SHADOW_1 } from 'Util/constants'

const Outer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, .8);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Content = styled.div`
  position: relative;
  background: #313131;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: ${BOX_SHADOW_1};

  ${({ isVideo }) => isVideo
    ? `
      width: 95%;
      max-width: 900px;
      
      iframe {
        display: block;
      }
      `
    : `
      img {
        display: block;
        margin: auto;
        max-height: 95vh;
      }
    `
  }
`

const Close = styled.div`
  position: absolute;
  bottom: 16px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 24px;
  color: #fff;
`

const PostModal = ({
  actions,
  id,
  post_hint: postHint,
  media_embed: mediaEmbed,
  url,
  title
}) => {
  if (!id) {
    return null
  }

  const isImage = postHint === 'image'
  const isVideo = postHint === 'rich:video'

  return (
    <Outer
      onClick={() => actions.goBack()}
    >
      {React.createElement(Content, {
        isVideo,
        onClick: e => {
          // Stop propagtion in order to prevent the
          // event from bubbing up and closing the
          // modal
          e.stopPropagation()
        }
      },
        <div>
          {isImage && (
            <img
              alt={title}
              src={url}
            />
          )}

          {isVideo && (
            <FluidIframe {...mediaEmbed} />
          )}

          <Close>
            <MdClose
              onClick={() => actions.goBack()}
            />
          </Close>
        </div>
      )}
    </Outer>
  )
}

export default PostModal
