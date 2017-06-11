import React from 'react'
import styled from 'styled-components'
import MdLink from 'react-icons/lib/md/link'
import MdText from 'react-icons/lib/md/text-fields'

const isActualThumbnail = thumbnail => thumbnail.startsWith('http')
const getPlaceholder = ({ thumbnail, url }) => {
  if (['nsfw'].includes(thumbnail)) {
    return thumbnail
  } else if (url.includes('www.reddit.com')) {
    return <MdText />
  } else {
    return <MdLink />
  }
}

const BaseThumbnail = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 4px;
  overflow: hidden;
`

const Image = BaseThumbnail.extend`
  background: url(${props => props.thumbnail});
  background-size: cover;
`

const Letter = BaseThumbnail.extend`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #323a45;
  color: #fff;
  text-transform: uppercase;
  font-size: 20px;

  svg {
    font-size: 32px;
  }
`

const Thumbnail = props => {
  if (isActualThumbnail(props.thumbnail)) {
    return <Image {...props} />
  }

  return <Letter>{getPlaceholder(props)}</Letter>
}

export default Thumbnail
