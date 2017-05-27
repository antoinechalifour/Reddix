import React from 'react'

const Thumbnail = ({
  actions,
  id,
  post_hint,
  thumbnail,
  url
}) => {
  if (thumbnail === 'self') {
    return null
  }

  const commonProps = {
    className: 'thumbnail',
    style: { backgroundImage: `url(${thumbnail})` }
  }
  let element

  if (post_hint === 'link') {
    element = 'a'
    commonProps.target = '_blank'
    commonProps.href = url
  } else {
    element = 'div'
    commonProps.onClick = () => actions.displayModal(id)
  }

  return React.createElement(element, commonProps)
}

export default Thumbnail