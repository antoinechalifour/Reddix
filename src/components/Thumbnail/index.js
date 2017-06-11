import React from 'react'
import styled from 'styled-components'

const isActualThumbnail = thumbnail => thumbnail.startsWith('http')
const getPlaceholder = str => {
  if (['nsfw'].includes(str)) {
    return str
  } else {
    return 'self'
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
`

const Thumbnail = props => {
  if (isActualThumbnail(props.thumbnail)) {
    return <Image {...props} />
  }

  return <Letter>{getPlaceholder(props.thumbnail)}</Letter>
}

export default Thumbnail
