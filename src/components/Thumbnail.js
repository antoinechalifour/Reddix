import React from 'react'
import styled from 'styled-components'

const ThumbnailLink = styled.a`
  display: block;
  width: 70px;
  height: 70px;
  background-size: cover;
  margin-right: 8px;
  border-radius: 4px;
`

const ThumbnailDiv = ThumbnailLink.withComponent('div')

const Thumbnail = ({
  actions,
  id,
  post_hint: postHint,
  thumbnail,
  url
}) => {
  if (thumbnail === 'self') {
    return null
  }

  const commonProps = {
    style: { backgroundImage: `url(${thumbnail})` }
  }
  let element

  if (postHint === 'link') {
    element = ThumbnailLink
    commonProps.target = '_blank'
    commonProps.href = url
  } else {
    element = ThumbnailDiv
    commonProps.onClick = () => actions.displayModal(id)
  }

  return React.createElement(element, commonProps)
}

export default Thumbnail
