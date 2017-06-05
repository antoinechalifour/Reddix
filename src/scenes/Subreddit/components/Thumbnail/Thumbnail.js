import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ThumbnailLink = styled(Link)`
  display: block;
  width: 70px;
  height: 70px;
  background-size: cover;
  margin-right: 8px;
  border-radius: 4px;
`

const Thumbnail = ({
  actions,
  id,
  post_hint: postHint,
  thumbnail,
  url
}) => {
  if (thumbnail === 'self' || !thumbnail) {
    return null
  }

  const commonProps = {
    style: { backgroundImage: `url(${thumbnail})` }
  }

  if (postHint === 'link') {
    commonProps.target = '_blank'
    commonProps.to = url
  } else {
    commonProps.to = `${window.location.pathname}/media/${id}`
  }

  return React.createElement(ThumbnailLink, commonProps)
}

export default Thumbnail
